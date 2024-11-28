'use strict'

const AccessService = require('../services/access.service.js')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');

class AccessController {

    // handlerRefreshToken = async (req, res, next) => {

    //   new SuccessResponse({
    //     message : "Get new token success !!!",
    //     metadata : await AccessService.handlerRefreshToken(req.keyStore.refreshToken)
    //   }).send(res);
    // }

    // handleRefreshTokenV2 = async (req, res, next) => {
    //     new SuccessResponse({
    //         message : "Get new token success !!!",
    //         metadata : await AccessService.handleRefreshTokenV2({
    //             refreshToken : req.refreshToken,
    //             user : req.user,
    //             keyStore : req.keyStore
    //         })
    //     })
    // }

    logout = async (req, res, next) => {

        new SuccessResponse({
            message : "Logout success !!!",
        }).send(res);
    }


    login = async (req, res, next) => {

        new SuccessResponse({
            message : 'Login Success !!!',
            metadata : await AccessService.login(req.body)
        }).send(res);

    }


    signUp = async (req, res, next) => {

        new CreatedSuccess({
            message : 'Registered Success !!!',
            metadata : await AccessService.signUp(req.body),
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
        new SuccessResponse({
            message:'Get user successfully',
            metadata: await AccessService.getUserById(req.params.id)
        }).send(res)
    }
    getListUsers = async(req, res, next) => {
        new SuccessResponse({
            message: 'Get list successfully',
            metadata: await  AccessService.listUsers(req.body)
        }).send(res)
    }
}

module.exports = new AccessController();