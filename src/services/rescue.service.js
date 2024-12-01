const RescueUnit = require('../models/rescueUnit.model'); // Model của RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const { getInforData } = require("../utils");

class RescueUnitService {

    /**
     * Tạo mới một RescueUnit.
     * @param {Object} rescueUnitData - Dữ liệu RescueUnit mới.
     * @returns {Object} - Thông tin RescueUnit đã tạo.
     */
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
        return newRescueUnit;
    }

    /**
     * Lấy danh sách tất cả các RescueUnit đang hoạt động.
     * @returns {Array} - Danh sách các RescueUnit.
     */
    static async getActiveRescueUnits() {
        const activeUnits = await RescueUnit.find({ activeStatus: true });
        if (!activeUnits || activeUnits.length === 0) throw new NotFoundError('No active rescue units found');
        return activeUnits;
    }

    /**
     * Thêm một loại sự cố vào RescueUnit.
     * @param {String} unitId - ID của RescueUnit.
     * @param {Object} incidentTypeData - Thông tin loại sự cố cần thêm.
     * @returns {Object} - RescueUnit sau khi cập nhật.
     */
    static async addIncidentType(unitId, incidentTypeData) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(
            unitId,
            { $push: { incidentTypes: incidentTypeData } },
            { new: true }
        );
        if (!updatedUnit) throw new NotFoundError('RescueUnit not found');
        return updatedUnit;
    }

    /**
     * Cập nhật thông tin một loại sự cố trong RescueUnit.
     * @param {String} unitId - ID của RescueUnit.
     * @param {String} incidentTypeId - ID của loại sự cố cần cập nhật.
     * @param {Object} updateData - Dữ liệu cập nhật.
     * @returns {Object} - RescueUnit sau khi cập nhật.
     */
    static async updateIncidentType({unitId, incidentTypeId, updateData}) {
        const unit = await RescueUnit.findById(unitId);
        if (!unit) throw new NotFoundError('RescueUnit not found');

        const incidentType = unit.incidentTypes.id(incidentTypeId);
        if (!incidentType) throw new NotFoundError('IncidentType not found');

        Object.assign(incidentType, updateData);
        await unit.save();
        return unit;
    }

    /**
     * Xóa một loại sự cố khỏi RescueUnit.
     * @param {String} unitId - ID của RescueUnit.
     * @param {String} incidentTypeId - ID của loại sự cố cần xóa.
     * @returns {Object} - RescueUnit sau khi cập nhật.
     */
    static async removeIncidentType(unitId, incidentTypeId) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(
            unitId,
            { $pull: { incidentTypes: { _id: incidentTypeId } } },
            { new: true }
        );
        if (!updatedUnit) throw new NotFoundError('RescueUnit or IncidentType not found');
        return updatedUnit;
    }

    /**
     * Cập nhật thông tin của một RescueUnit.
     * @param {String} unitId - ID của RescueUnit.
     * @param {Object} updateData - Dữ liệu cập nhật.
     * @returns {Object} - RescueUnit sau khi cập nhật.
     */
    static async updateRescueUnit(unitId, updateData) {
        const updatedUnit = await RescueUnit.findByIdAndUpdate(unitId, updateData, { new: true });
        if (!updatedUnit) throw new NotFoundError('RescueUnit not found');
        return updatedUnit;
    }

    static async searchRescueUnits(filters) {
        const query = {};

        // Kiểm tra và thêm các điều kiện tìm kiếm vào query nếu có
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

        try {
            const rescueUnits = await RescueUnit.find(query);
            return rescueUnits;
        } catch (error) {
            console.error('Error searching rescue units:', error);
            throw error;
        }
    }

}

module.exports = RescueUnitService;
