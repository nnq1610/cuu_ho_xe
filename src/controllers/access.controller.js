'use strict'

const AccessService = require('../services/access.service.js')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');
const mongoose = require('mongoose');
const {userValidationSchema} = require("../validators/user.validation")
class AccessController {
     login = async (req, res, next) => {

        new SuccessResponse({
            message : 'Login Success !!!',
            metadata : await AccessService.login(req.body)
        }).send(res);
    }

    updateUser = async(req, res, next) => {
        const id = req.userId;
        const { name, email, phone, address, role } = req.body;
        const updateData = { name, email, phone, address };

        const {error} = userValidationSchema.validate(updateData, {abortEarly: false});
        if (error) {
            return res.status(400).json({
                success: false,
                message: "validate sai",
                errors: error.details.map((err) => err.message),
            });
        }
        return new SuccessResponse({
            message : 'Update success !!!',
            metadata:   await AccessService.updateUser({ id, updateData })
        }).send(res)
    }

    signUp = async (req, res, next) => {
        const { name, email, password, phone, role, address } = req.body;
        const file = req.file; // Lấy file ảnh từ req
        new CreatedSuccess({
            message : 'Registered Success !!!',
            metadata : await AccessService.signUp({ name, email, password, phone, role, address, file}),
            options : {
                limit : 100
            }
        }).send(res);
    }

    logout = async(req, res, next) => {
        new SuccessResponse({
            message: "Log out successfully",
            metadata: await AccessService.logout(req.body)
        }).send(res)
    }

    getUserById = async(req, res, next) => {
        const {id} = req.params;
        new SuccessResponse({
            message:'Get user successfully',
            metadata: await AccessService.getUserById(id)
        }).send(res)
    }

    getUser = async(req, res, next) => {
        const id = req.userId;
        new SuccessResponse({
            message:'Get user successfully',
            metadata: await AccessService.getUserById(id)
        }).send(res)
    }


    getListUsers = async(req, res, next) => {
        new SuccessResponse({
            message: 'Get list successfully',
            metadata: await  AccessService.listUsers(req.body)
        }).send(res)
    }

    changePassword = async(req, res, next) => {
        new SuccessResponse({
            message:'Password change successfully',
            metadata: await AccessService.changePassword(req.body)
        }).send(res)
    }

    deleteAccount = async(req, res, next) => {
        const {userId} = req.params;
        const id = req.userId;
        if(userId !== id) {
            return new SuccessResponse({
                message: 'Bạn không có quyền xoá dữ liệu này!',
                metadata: null
            }).send(res);
        }
        return new SuccessResponse({
            message: 'Account deleted successfully',
            metadata: await AccessService.deleteAccount(id)
        }).send(res);


    }



}

module.exports = new AccessController();
