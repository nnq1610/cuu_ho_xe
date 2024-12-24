const Joi = require('joi');

const reviewValidationSchema = Joi.object({

    userId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "userId phải là một ObjectId hợp lệ.",
            "any.required": "userId là bắt buộc.",
        }),
    content: Joi.string()
        .min(0)
        .max(500)
        .required()
        .messages({
            "string.empty": "Nội dung không được để trống.",
            "string.max": "Nội dung không được vượt quá {#limit} ký tự.",
            "any.required": "Nội dung là bắt buộc.",
        }),
    rating: Joi.number()
        .min(0)
        .max(5)
        .required()
        .messages({
            "number.base": "Đánh giá phải là số.",
            "number.min": "Đánh giá không được nhỏ hơn {#limit}.",
            "number.max": "Đánh giá không được lớn hơn {#limit}.",
            "any.required": "Đánh giá là bắt buộc.",
        }),
}).fork(['userId', 'content', 'rating'], (schema) => schema.optional());

module.exports = { reviewValidationSchema };

