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

export const UserInfoSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  items: { type: Map, of: UserItemSchema },
});

export interface UserInfo extends Document {
  username: string;
  email: string;
  amount: number;
  items: { [id: string]: UserItem };
}

export const UserInfoModel = mongoose.model<UserInfo>(
  "UserInfo",
  UserInfoSchema
);

export const UserInfoJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  amount: Joi.number().integer().required().min(0),
  items: Joi.object({}).pattern(Joi.string(), UserItemJoiSchema).required(),
});
