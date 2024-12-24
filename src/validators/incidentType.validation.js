const Joi = require('joi');

const incidentTypeSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
            "string.min": "Tên phải có ít nhất {#limit} ký tự.",
            "string.max": "Tên không được vượt quá {#limit} ký tự.",
        }),
    description: Joi.string()
        .max(255)
        .optional()
        .messages({
            "string.max": "Mô tả không được vượt quá {#limit} ký tự.",
        }),
    vehicleType: Joi.string()
        .optional()
        .max(100)
        .messages({
        }),
    price: Joi.number()
        .positive()
        .optional()
        .messages({
            "number.base": "Giá phải là số hợp lệ.",
            "number.positive": "Giá phải là số dương.",
        }),
    address: Joi.string()
        .min(5)
        .max(200)
        .optional()
        .messages({
            "string.min": "Địa chỉ phải có ít nhất {#limit} ký tự.",
            "string.max": "Địa chỉ không được vượt quá {#limit} ký tự.",
        }),
    image: Joi.string()
        .uri()
        .optional()
        .messages({
            "string.uri": "Hình ảnh phải là một URL hợp lệ.",
        }),
}).fork(['name', 'description', 'vehicleType', 'price', 'address'], (schema) => schema.optional());

module.exports = { incidentTypeSchema };
