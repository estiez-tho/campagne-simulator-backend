import { Schema } from "mongoose";
import Joi from "@hapi/joi";

export const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  quantity: { type: Number, required: true },
  progression: { type: Number, required: true },
  progressionLastUpdated: { type: Date, required: true },
});

export interface Item {
  name: string;
  price: number;
  duration: number;
  quantity: number;
  progression: number;
  progressionLastUpdated: Date;
}

export const ItemJoiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required().min(0),
  duration: Joi.number().integer().required().min(0),
  quantity: Joi.number().integer().required().min(0),
  progression: Joi.number().integer().required().min(0),
  progressionLastUpdated: Joi.date().required(),
});
