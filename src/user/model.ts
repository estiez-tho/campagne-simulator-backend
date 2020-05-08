import mongoose, { Schema, Document } from "mongoose";
import { Item, ItemSchema, ItemJoiSchema } from "../items/model";
import Joi from "@hapi/joi";

export const UserInfoSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: Number, required: true },
  amount: { type: Number, required: true },
  items: { type: Map, of: ItemSchema },
});

export interface UserInfo extends Document {
  username: string;
  email: string;
  amount: number;
  items: { [id: string]: Item };
}

export const UserInfoModel = mongoose.model<UserInfo>(
  "UserInfo",
  UserInfoSchema
);

export const UserInfoJoiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  amount: Joi.number().integer().required().min(0),
  items: Joi.object({}).pattern(Joi.string(), ItemJoiSchema).required(),
});
