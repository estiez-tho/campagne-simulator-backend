import mongoose, { Schema, Document } from "mongoose";
import { Items } from "../../config/items";
import Joi from "@hapi/joi";

export const UserItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  reward: { type: Number, required: true },
  duration: { type: Number, required: true },
  quantity: { type: Number, required: true },
  progression: { type: Number, required: true },
  progressionLastUpdated: { type: Date, required: true },
});

export interface UserItem extends Document {
  name: string;
  price: number;
  reward: number;
  duration: number;
  quantity: number;
  progression: number;
  progressionLastUpdated: Date;
}

export const UserItemModel = mongoose.model<UserItem>(
  "UserItem",
  UserItemSchema
);

export const UserItemJoiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required().min(0),
  reward: Joi.number().integer().required().min(0),
  duration: Joi.number().integer().required().min(0),
  quantity: Joi.number().integer().required().min(0),
  progression: Joi.number().integer().required().min(0),
  progressionLastUpdated: Joi.date().required(),
});

export interface ItemPurchase {
  itemId: number;
  purchaseTime: Date;
}

export const ItemPurchaseJoiSchema = Joi.object({
  itemId: Joi.number()
    .required()
    .min(0)
    .max(Items.length - 1),
  purchaseTime: Joi.date().required(),
});
