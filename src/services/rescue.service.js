const RescueUnit = require('../models/rescueUnit.model'); // Model của RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const { getInforData } = require("../utils");
const RescueService = require("./rescue.service");

class RescueUnitService {


    static async createRescueUnit( rescueUnitData) {

        if (!rescueUnitData) {
            throw new Error("rescueUnitData is required.");
        }
        const { userId, name, incidentTypes, rating = 0, activeStatus = true } = rescueUnitData;

        const newRescueUnit = await RescueUnit.create({
            userId,
            name,
            incidentTypes: incidentTypes.map(({ name, description = '', vehicleType, price, address }) => ({
                name,
                description,
                vehicleType,
                price,
                address
            })),
            rating,
            activeStatus
        });

        if (!newRescueUnit) throw new BadRequestError('Unable to create Rescue Unit');
        return getInforData({
            fields: [ 'name', 'incidentTypes'],
            object: newRescueUnit
        });
    }


    static async getActiveRescueUnits() {
        const activeUnits = await RescueUnit.find({ activeStatus: true });
        if (!activeUnits || activeUnits.length === 0) throw new NotFoundError('No active rescue units found');
        return activeUnits;
    }


    static async addIncidentType({userId,incidentTypeData} ) {

        if (!userId || !incidentTypeData) throw new BadRequestError("User ID and incident type data are required");
        const rescueUnit = await RescueUnit.findOne({userId})
        if (!rescueUnit) throw new NotFoundError("Rescue Unit not found for the given User ID");
        rescueUnit.incidentTypes.push(incidentTypeData);

        await rescueUnit.save();
        return rescueUnit;

    }

    static async updateIncidentType({userId, updateData}) {
        if (!userId || !updateData) throw new BadRequestError('User ID and update data are required');
        const rescueUnit = await RescueUnit.findOne({ userId });

    }

    static async removeIncidentType(unitId, incidentTypeId) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(
            unitId,
            { $pull: { incidentTypes: { _id: incidentTypeId } } },
            { new: true }
        );
        if (!updatedUnit) throw new NotFoundError('RescueUnit or IncidentType not found');
        return updatedUnit;
    }


    static async updateRescueUnit(unitId, updateData) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(unitId, updateData, { new: true });
        if (!updatedUnit) throw new NotFoundError('RescueUnit not found');
        return updatedUnit;
    }

    static async searchRescueUnits(filters) {
        const query = {};

        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa chữ thường
        }
        if(filters.incidentTypes) {
            query.incidentTypes = filters.incidentTypes.map(({ name }) => name.toLowerCase());
        }
        if (filters.vehicleType) {
            query['incidentTypes'] = {
                $elemMatch: {
                    vehicleType: filters.vehicleType // Tìm kiếm incidentTypes có vehicleType phù hợp
                }
            };
        }

        if (filters.price) {
            query['incidentTypes.price'] = filters.price; // Tìm kiếm theo giá
        }

        if (filters.address) {
            query.address = { $regex: filters.address, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa chữ thường
        }

        if (filters.address) {
            query['incidentTypes'] = {
                $elemMatch: {
                    address: { $regex: filters.address, $options: 'i' }
                }
            };
        }

        try {
            const rescueUnits = await RescueUnit.find(query);
            console.log("Before getInforData:", rescueUnits);

            const result = rescueUnits.map(unit => ({
                name: unit.name,
                incidentTypes: unit.incidentTypes.map(type => ({
                    name: type.name,
                    vehicleType: type.vehicleType,
                    price: type.price,
                    address: type.address,
                })),
            }));

            return result;
        } catch (error) {
            console.error('Error searching rescue units:', error);
            throw error;
        }
    }

}

module.exports = RescueUnitService;
