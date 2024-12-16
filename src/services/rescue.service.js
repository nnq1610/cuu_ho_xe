const RescueUnit = require('../models/rescueUnit.model'); // Model của RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const { getInforData, unGetSelectData } = require("../utils");
const mongoose = require('mongoose');
const {Error} = require("mongoose");
const {uploadImage} = require("../configs/cloudinary.config");

class RescueUnitService {

    static async createRescueUnit({userId, rating, activeStatus}) {
        if (!userId) {
            throw new BadRequestError("User Id is required");
        }
        const rescueUnit = await RescueUnit.create({
            userId,
            rating,
            activeStatus
        })

        return rescueUnit
    }

    static async getRescueUnitByUserId(userId) {
        if (!userId) {
            throw new Error("userId is required.");
        }
        const rescueUnit = await RescueUnit.findOne({userId});

        if (!rescueUnit) {
            await  this.createRescueUnit({userId})
        }

        return rescueUnit;
    }

    static async getIncidentDetail(userId, incidentId) {
        // Tìm rescue unit dựa trên userId
        const rescueUnit = await RescueUnit.findOne({userId}).lean();
        console.log("Rescue Unit:", rescueUnit);

        if (!rescueUnit) {
            throw new NotFoundError("Rescue unit not found.");
        }

        const incidentTypes = rescueUnit.incidentTypes || [];
        if (!Array.isArray(incidentTypes)) {
            throw new Error("Incident types should be an array.");
        }
        console.log(
            "Available Incident IDs:",
            incidentTypes.map((incident) => incident._id.toString())
        );
        console.log("Provided Incident ID:", incidentId);
        const incidentDetail = incidentTypes.find(
            (incident) => incident._id?.toString() === incidentId.toString()
        );

        if (!incidentDetail) {
            throw new NotFoundError("Incident not found.");
        }

        return {
            rescueUnitName: rescueUnit.name, // Trả thêm thông tin tên Rescue Unit nếu cần
            incidentDetail,
        };
    }

    static async removeIncidentType({userId, incidentTypeId}) {

        const updatedUnit = await RescueUnit.findOneAndUpdate(
            {userId},
            {$pull: {incidentTypes: {_id: incidentTypeId}}},
            {new: true}
        );

        if (!updatedUnit) throw new NotFoundError('RescueUnit or IncidentType not found');
        return updatedUnit;
    }


    static async getActiveRescueUnits() {
        const activeUnits = await RescueUnit.find({activeStatus: true});
        if (!activeUnits || activeUnits.length === 0) throw new NotFoundError('No active rescue units found');
        return activeUnits;
    }

    static async addIncidentType({userId, incidentTypeData}) {
        if (!userId || !incidentTypeData) {
            throw new BadRequestError("User ID and incident type data are required");
        }
        const rescueUnit = await RescueUnit.findOne({userId});
        if (!rescueUnit) {
            const newRC = await this.createRescueUnit({userId})
            newRC.incidentTypes.push(incidentTypeData);
            const updatedRescueUnit = await rescueUnit.save();
            return updatedRescueUnit;
        }
        rescueUnit.incidentTypes.push(incidentTypeData);

        const updatedRescueUnit = await rescueUnit.save();
        return updatedRescueUnit;
    }

    static async updateIncidentType({userId, incidentTypeId, updateData}) {
        if (!userId || !incidentTypeId || !updateData) {
            throw new BadRequestError('User ID, Incident Type ID, and update data are required');
        }

        const rescueUnit = await RescueUnit.findOne({userId});
        if (!rescueUnit) {
            throw new NotFoundError("Rescue Unit not found for the given User ID");
        }

        const incidentType = rescueUnit.incidentTypes.id(incidentTypeId);
        if (!incidentType) {
            throw new NotFoundError("Incident Type not found for the given ID");
        }

        Object.assign(incidentType, updateData);

        await rescueUnit.save();
        return {
            message: "Incident Type updated successfully",
            updatedIncidentType: incidentType,
        };
    }

    static async updateRescueUnit(unitId, updateData) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(unitId, updateData, {new: true});
        if (!updatedUnit) throw new NotFoundError('RescueUnit not found');
        return updatedUnit;
    }


    static async searchRescueUnits(filters) {
        try {
            const query = {};

            // Tìm kiếm theo name (không phân biệt hoa thường, tìm kiếm bao gồm)
            if (filters.name) {
                query.name = {$regex: filters.name, $options: 'i'};
            }

            // Lấy danh sách rescue units phù hợp với query
            const rescueUnits = await RescueUnit.find(query);

            // Áp dụng bộ lọc trên từng unit
            const filteredUnits = rescueUnits.map((unit) => {
                const incidentTypes = unit.incidentTypes || [];

                // Lọc incidentTypes theo vehicleType và address nếu có
                const filteredIncidentTypes = incidentTypes.filter((type) => {
                    let isValid = true;

                    // Lọc theo vehicleType
                    if (filters.vehicleType) {
                        isValid = isValid &&
                            type.vehicleType?.toLowerCase() === filters.vehicleType.toLowerCase();
                    }

                    // Lọc theo address (tìm kiếm một phần)
                    if (filters.address) {
                        const regex = new RegExp(filters.address, 'i'); // Không phân biệt hoa thường
                        isValid = isValid && regex.test(type.address || '');
                    }

                    return isValid;
                });

                return {
                    // ...unit._doc,
                    incidentTypes: filteredIncidentTypes
                };
            });

            const finalResult = filteredUnits.filter((unit) =>
                unit.incidentTypes && unit.incidentTypes.length > 0
            );
            console.log('final result: ',finalResult)
            return {
                finalResult
            };
        } catch (error) {
            console.error('Error searching rescue units:', error);
            throw new Error('Lỗi trong quá trình tìm kiếm các rescue units.');
        }
    }
}


    module.exports = RescueUnitService;
