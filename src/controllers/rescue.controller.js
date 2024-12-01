'use strict'

const RescueService = require('../services/rescue.service')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');

class RescueController {

    createRescueUnit = async (req, res, next) => {
        new SuccessResponse({
            message : "Create success",
            metadata: await RescueService.createRescueUnit(req.body)
        }).send(res);
    }


    getActiveRescueUnits = async (req, res, next) => {
        new SuccessResponse({
            message : 'Get success !!!',
            metadata : await RescueService.getActiveRescueUnits(req.body)
        }).send(res);

    }
    addIncidentType = async (req, res, next) => {

        const unitId = req.params.unitId;  // Lấy unitId từ URL
        const incidentTypeData = req.body; // Lấy dữ liệu loại sự cố từ body của request
        new SuccessResponse({
            message : 'Update success !!!',
            metadata : await RescueService.addIncidentType(unitId, incidentTypeData)
        }).send(res);
    }

    updateIncidentType = async(req, res, next) => {
        new SuccessResponse({
            message: "Update success !!!",
            metadata: await RescueService.updateIncidentType(req.body)
        })
    }

    removeIncidentType = async(req, res, next) => {
        new SuccessResponse({
            message: "Remove success !!!",
            metadata:  await  RescueService.removeIncidentType(req.body)
        })
    }
    updateRescueUnit = async(req, res, next) => {
        new SuccessResponse({
            message: "Remove success !!!",
            metadata:  await  RescueService.updateRescueUnit(req.body)
        })
    }

    searchRescueUnits = async(req, res, next) => {
        new SuccessResponse({
            message: "Search success !!!",
            metadata: await RescueService.searchRescueUnits(req.query)
        }).send(res)
    }



}

module.exports = new RescueController();