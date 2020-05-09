import Joi from "@hapi/joi";

export const validateModel = (data: any, model: Joi.object): void => {
  const { error } = model.validate(data);
  if (error)
    throw new Error(`Validation Error for ${model} : ${JSON.stringify(error)}`);
};
