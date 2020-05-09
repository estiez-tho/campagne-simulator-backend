import mongoose, { Schema, Document } from "mongoose";
import Joi from "@hapi/joi";

export const UserItemSchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  progression: { type: Number, required: true },
  progressionLastUpdated: { type: Date, required: true },
});

export interface UserItem extends Document {
  quantity: number;
  progression: number;
  progressionLastUpdated: Date;
}

export const UserItemModel = mongoose.model<UserItem>(
  "UserItem",
  UserItemSchema
);

export const UserItemJoiSchema = Joi.object({
  quantity: Joi.number().integer().required().min(0),
  progression: Joi.number().integer().required().min(0),
  progressionLastUpdated: Joi.date().required(),
});
