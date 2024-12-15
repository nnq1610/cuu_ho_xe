const RescueUnit = require('../models/rescueUnit.model'); // Model của RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const { getInforData, unGetSelectData } = require("../utils");
const mongoose = require('mongoose');
const {Error} = require("mongoose");
const {uploadImage} = require("../configs/cloudinary.config");

class RescueUnitService {

    static async createRescueUnit({ userId, rating, activeStatus }) {
        if(!userId) {
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
            const rescueUnit = await RescueUnit.findOne({ userId });

            if (!rescueUnit) {
                throw new NotFoundError("Rescue Unit not found.");
            }

            return rescueUnit;
    }

    static async getIncidentDetail(userId, incidentId) {
        // Tìm rescue unit dựa trên userId
        const rescueUnit = await RescueUnit.findOne({ userId }).lean();
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
            { $pull: { incidentTypes: { _id: incidentTypeId } } },
            { new: true }
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

    static async updateIncidentType({ userId, incidentTypeId, updateData }) {
        if (!userId || !incidentTypeId || !updateData) {
            throw new BadRequestError('User ID, Incident Type ID, and update data are required');
        }

        const rescueUnit = await RescueUnit.findOne({ userId });
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
        const updatedUnit = await RescueUnit.findByIdAndUpdate(unitId, updateData, { new: true });
        if (!updatedUnit) throw new NotFoundError('RescueUnit not found');
        return updatedUnit;
    }

    static async searchRescueUnits(filters) {
        const query = {};
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        try {
            // Lấy dữ liệu Rescue Units dựa trên query
            const rescueUnits = await RescueUnit.find(query);

            const filteredUnits = rescueUnits.map(unit => {
                const incidentTypes = unit.incidentTypes || [];

                const filteredIncidentTypes = incidentTypes.filter(type => {
                    let isValid = true;

                    // Lọc theo vehicleType
                    if (filters.vehicleType) {
                        isValid = isValid && type.vehicleType.toLowerCase() === filters.vehicleType.toLowerCase();
                    }

                    // Lọc theo address (hỗ trợ tìm kiếm một phần)
                    if (filters.address) {
                        const regex = new RegExp(filters.address, 'i'); // Không phân biệt hoa thường
                        isValid = isValid && regex.test(type.address); // Sử dụng regex.test
                    }

                    return isValid;
                });

                // Trả về đối tượng với incidentTypes đã được lọc
                console.log(unit._doc)
                return {
                    ...unit._doc,
                    incidentTypes: filteredIncidentTypes
                };
            });

            const finalResult = filteredUnits.filter(unit => unit.incidentTypes && unit.incidentTypes.length > 0);
            console.log('result: ', finalResult);
            return finalResult;
        } catch (error) {
            console.error('Error searching rescue units:', error);
            throw error;
        }
    }

}

module.exports = RescueUnitService;
