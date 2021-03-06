import mongoose, { Schema, Document } from "mongoose";
import { UserItem, UserItemSchema, UserItemJoiSchema } from "../userItem/model";
import Joi from "@hapi/joi";

export interface UserCreationData {
  username: string;
  email: string;
}

export const UserCreationDataJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

export interface UserVerificationData {
  verificationCode: string;
  email: string;
}

export const UserVerificationDataJoiSchema = Joi.object({
  verificationCode: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const UserInfoSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  items: { type: Map, of: UserItemSchema, required: true },
  serverTime: { type: Date, required: true },
  deviceTime: { type: Date, required: true },
});

export interface UserInitInfo extends Document {
  username: string;
  email: string;
  amount: number;
  items: { [id: string]: UserItem };
  serverTime: Date;
  deviceTime: Date;
}

export interface UserInfo extends UserInitInfo {
  _id: string;
}

export const UserInfoModel = mongoose.model<UserInfo>(
  "UserInfo",
  UserInfoSchema
);

export const UserInitInfoJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  amount: Joi.number().integer().required().min(0),
  items: Joi.object({}).pattern(Joi.string(), UserItemJoiSchema).required(),
  serverTime: Joi.date().required(),
  deviceTime: Joi.date().required(),
});

export const TempUserSchema = new Schema({
  email: { type: String, required: true },
  verificationCode: { type: String, required: true },
  username: { type: String, required: true },
});

export interface TempUser {
  email: string;
  verificationCode: string;
  username: string;
}

export const TempUserModel = mongoose.model<TempUser>(
  "TempUser",
  TempUserSchema
);

export const TempUserJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  verificationCode: Joi.string().required(),
  username: Joi.string().required(),
});
