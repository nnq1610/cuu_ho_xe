const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required()
        .messages({
            "string.empty": "Tên không được để trống.",
            "string.max": "Tên không được vượt quá {#limit} ký tự.",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email phải là một địa chỉ email hợp lệ.",
            "any.required": "Email là bắt buộc.",
        }),
    password: Joi.string()
        .min(4)
        .required()
        .messages({
            "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
            "any.required": "Mật khẩu là bắt buộc.",
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/) // Chỉ cho phép số từ 10 đến 15 ký tự
        .required()
        .messages({
            "string.pattern.base": "Số điện thoại chỉ được chứa các chữ số và phải từ 10 đến 15 ký tự.",
            "any.required": "Số điện thoại là bắt buộc.",
        }),

    role: Joi.string()
        .valid('customer', 'rescue')
        .required()
        .messages({
            "any.only": "Role phải là một trong các giá trị: 'customer' hoặc 'rescue'.",
            "any.required": "Role là bắt buộc.",
        }),

    address: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            "string.min": "Địa chỉ phải có ít nhất {#limit} ký tự.",
            "string.max": "Địa chỉ không được vượt quá {#limit} ký tự.",
            "any.required": "Địa chỉ là bắt buộc.",
        }),
    image: Joi.object({
        data: Joi.binary().optional(),
        contentType: Joi.string().optional()
    }).optional()

}).fork(['name', 'email', 'password', 'phone', 'role', 'address'], (schema) => schema.optional());

module.exports = { userValidationSchema };
