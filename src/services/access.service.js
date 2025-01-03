'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const reviewModel = require('../models/review.model');
const rescueUnitModel = require('../models/rescueUnit.model');
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getInforData } = require("../utils");
const mongoose = require("mongoose");

class AccessService {

    static signUp = async ({ name, email, password, phone, role, address }) => {

        const existingUser = await userModel.findOne({ email }).lean();
        if (existingUser) throw new BadRequestError('Error: User already exists !!!');
        if (!password) throw new BadRequestError('Password is required');

        const passwordHash = await bcrypt.hash(password, 10).catch(err => {
            throw new Error('Error hashing password: ' + err.message);
        });

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            phone,
            role,
            address
        });

        if (newUser) {
            // Tạo token
            const token = jwt.sign(
                { userId: newUser._id, role: newUser.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return {
                user: getInforData({
                    fields: ['_id', 'name', 'email', 'phone', 'role'],
                    object: newUser
                }),
                token
            };
        } else {
            throw new Error({msg: 'Error: Unable to create user !!!'});
        }
    };


    static login = async ({ email, password }) => {
        const user = await userModel.findOne({ email });
        if (!user) throw new BadRequestError('Error: User not found !!!');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AuthFailureError('Error: Invalid credentials !!!');

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            user: getInforData({
                fields: ['_id', 'name', 'email', 'phone', 'role'],
                object: user
            }),
            token
        };
    };
    static logout =  () => {
        return { message: "Logout successful" };
    };

    static getUserById = async (id) => {
        if (!id) throw new BadRequestError('User ID is required');

        const user = await userModel.findById(id).lean();
        if (!user) throw new BadRequestError('User not found');

        return getInforData({
            fields: ['_id', 'name', 'email', 'phone', 'role', 'address'],
            object: user
        });

    };


    static updateUser = async ({id, updateData}) => {
        if (!id || !updateData) throw new BadRequestError('User ID and update data are required');

        const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updatedUser) throw new BadRequestError('Failed to update user');

        return getInforData({
            fields: ['_id', 'name', 'email', 'phone', 'role', 'address', 'image'],
            object: updatedUser
        });
    };

    static deleteAccount = async (userId) => {
            const deletedUser = await userModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new BadRequestError('User not found');
            }
            const deleteReviewsResult = await reviewModel.deleteMany({ userId });

            const deleteRescueUnitsResult = await rescueUnitModel.deleteMany(
                { userId }
            );

            return {
                message: 'User and all related data deleted successfully',
                details: {
                    deletedUser: userId,
                    deletedReviewsCount: deleteReviewsResult.deletedCount,
                    deletedRescueUnitsCount: deleteRescueUnitsResult.deletedCount,
                },
            };
    };



    static listUsers = async ({ page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;

        const users = await userModel
            .find({})
            .skip(skip)
            .limit(limit)
            .lean();

        const totalUsers = await userModel.countDocuments();

        return {
            data: users.map(user => getInforData({
                fields: ['_id', 'name', 'email', 'phone', 'role', 'address'],
                object: user
            })),
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers
            }
        };
    };

    static changePassword = async({userId, oldPassword, newPassword}) => {
        if(!newPassword || !oldPassword) throw new BadRequestError('All password is required');

        const user = await userModel.findById(userId)

        if(!user) throw new BadRequestError('User does not exist');

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new AuthFailureError('Old password is incorrect');
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.password = newPasswordHash;

        await user.save();
        return {
            message: 'Password changed successfully'
        }

    }


}

module.exports = AccessService;
