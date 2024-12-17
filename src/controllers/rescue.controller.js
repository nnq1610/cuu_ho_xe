'use strict'

const RescueService = require('../services/rescue.service')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');
const {deserialize} = require("mongodb");
const req = require("express/lib/request");

class RescueController {
    createRescueUnit = async (req, res, next) => {

    }

    getRescueUnitByUserId = async (req, res, next) => {
        const { userId } = req.params;
        new SuccessResponse({
            message : "Get success",
            metadata: await RescueService.getRescueUnitByUserId(userId)
        }).send(res)
    }
    getActiveRescueUnits = async (req, res, next) => {

        new SuccessResponse({
            message : 'Get success !!!',
            metadata : await RescueService.getActiveRescueUnits(req.body)
        }).send(res);

    }


    getDetailIncidentById = async(req, res, next) => {
        // const userId = req.headers['x-user-id']
        const {incidentId}   = req.params
        new SuccessResponse({
            message: "Get success",
            metadata: await RescueService.getIncidentDetail( incidentId)
        }).send(res)
    }

    addIncidentType = async (req, res, next) => {
        const {name, description, vehicleType, price, address} = req.body
        const incidentTypeData = {name, description, vehicleType, price, address}
        const file = req.file
        if(file && file.url ) {
            incidentTypeData.image = file.url
        }
        const userId = req.userId
        // if(incidentTypeData.image.url)
        new SuccessResponse({
            message : 'Update success !!!',
            metadata : await RescueService.addIncidentType({ userId, incidentTypeData })
        }).send(res);
    }
    updateIncidentType = async(req, res, next) => {
        const { incidentTypeId } = req.params;
        const {name, description, vehicleType, price, address} = req.body
        const file = req.file
        const updateData = {name, description, vehicleType, price, address}
            if(file && file.url) {
                updateData.image = file.url
            }
        const userId = req.userId
        new SuccessResponse({
            message: "Update success !!!",
            metadata: await RescueService.updateIncidentType({userId, incidentTypeId, updateData})
        }).send(res)
    }

    removeIncidentType = async(req, res, next) => {
        const { incidentTypeId } = req.params;
        const userId = req.headers['x-user-id']
        new SuccessResponse({
            message: "Remove success !!!",
            metadata:  await  RescueService.removeIncidentType({ userId, incidentTypeId })
        }).send(res)
    }

    updateRescueUnit = async(req, res, next) => {

        new SuccessResponse({
            message: "Remove success !!!",
            metadata:  await  RescueService.updateRescueUnit(req.body)
        })
    }
    searchRescueUnits = async(req, res, next) => {
        new SuccessResponse({
             metadata: await RescueService.searchRescueUnits(req.body)
        }).send(res)
    }

}

module.exports = new RescueController();