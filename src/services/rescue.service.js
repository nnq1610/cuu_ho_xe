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

    // static async getIncidentDetail(userId, incidentId) {
    //     // Tìm rescue unit dựa trên userId
    //     const rescueUnit = await RescueUnit.findOne({userId}).lean();
    //     console.log("Rescue Unit:", rescueUnit);
    //
    //     if (!rescueUnit) {
    //         throw new NotFoundError("Rescue unit not found.");
    //     }
    //
    //     const incidentTypes = rescueUnit.incidentTypes || [];
    //     if (!Array.isArray(incidentTypes)) {
    //         throw new Error("Incident types should be an array.");
    //     }
    //     console.log(
    //         "Available Incident IDs:",
    //         incidentTypes.map((incident) => incident._id.toString())
    //     );
    //     console.log("Provided Incident ID:", incidentId);
    //     const incidentDetail = incidentTypes.find(
    //         (incident) => incident._id?.toString() === incidentId.toString()
    //     );
    //
    //     if (!incidentDetail) {
    //         throw new NotFoundError("Incident not found.");
    //     }
    //
    //     return {
    //         rescueUnitName: rescueUnit.name, // Trả thêm thông tin tên Rescue Unit nếu cần
    //         incidentDetail,
    //         userId: userId
    //     };
    // }

    static async getIncidentDetail(incidentId) {
        if (!incidentId) throw new Error("incidentId is required.");

        const [result] = await RescueUnit.aggregate([
            { $unwind: "$incidentTypes" },
            {
                $match: {
                    "incidentTypes._id": new mongoose.Types.ObjectId(incidentId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    _id: 0,
                    incidentDetail: "$incidentTypes",
                    name: "$userDetails.name",
                    phone: "$userDetails.phone",
                    uid: "$userDetails._id"
                },
            },
        ]);

        if (!result) throw new NotFoundError("Incident not found.");

        return result;
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

    static async searchRescueUnits(filter) {
        try {
            const { name, vehicleType, address } = filter;

            const matchConditions = {};

            if (name) {
                matchConditions['incidentTypes.name'] = { $regex: name, $options: 'i' };
            }
            if (vehicleType) {
                matchConditions['incidentTypes.vehicleType'] = { $regex: vehicleType, $options: 'i' };
            }
            if (address) {
                matchConditions['incidentTypes.address'] = { $regex: address, $options: 'i' };
            }

            const pipeline = [
                { $match: matchConditions },
                {
                    $project: {
                        userId: 1,
                        rating: 1,
                        activeStatus: 1,
                        incidentTypes: {
                            $filter: {
                                input: '$incidentTypes',
                                as: 'type',
                                cond: {
                                    $and: [
                                        name ? { $regexMatch: { input: '$$type.name', regex: name, options: 'i' } } : {},
                                        vehicleType
                                            ? { $regexMatch: { input: '$$type.vehicleType', regex: vehicleType, options: 'i' } }
                                            : {},
                                        address
                                            ? { $regexMatch: { input: '$$type.address', regex: address, options: 'i' } }
                                            : {},
                                    ],
                                },
                            },
                        },
                    },
                },
            ];

            const result = await RescueUnit.aggregate(pipeline);

            console.log('Search Results:', JSON.stringify(result, null, 2));
            return result;
        } catch (error) {
            console.error('Error during search:', error);
            throw error;
        }
    }

}


    module.exports = RescueUnitService;
