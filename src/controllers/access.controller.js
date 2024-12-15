'use strict'

const AccessService = require('../services/access.service.js')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');
const mongoose = require('mongoose');
const {BadRequestError} = require("../core/error.response");
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
        // const file = req.file;

        const updateData = { name, email, phone, address };
        // if (file && file.url) {
        //     updateData.image = file.url;
        // }
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

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestError("Invalid user ID format");
        }
        new SuccessResponse({
            message:'Delete success !!!',
            metadata: await  AccessService.deleteAccount(req.params)
        }).send(res)
    }

}

module.exports = new AccessController();