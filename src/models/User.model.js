import { Schema, model } from 'mongoose';
import joi from '@hapi/joi';

// DB Schema
const userSchema = new Schema({
	nickname: {
		type: String,
		required: true,
		unique: true,
		min: 4,
		max: 20,
	},
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, { timestamps: true });

// JOI Validation Setup
const userSchemaValidation = {
	nickname: joi.string().min(5).max(20).required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).max(20).required(),
};

export const signupSchema = joi
	.object(userSchemaValidation)
	.options({ abortEarly: false });

export const loginSchema = joi.object({
	nickname: joi.string().min(5).max(20),
	email: joi.string().email(),
	password: joi.string().min(8).max(20).required(),
});

export const User = model('User', userSchema);
