import Joi from "joi";

//  Contact = {
// name: string
// email: string
// phone number: number
// message: string
// }

const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(32),
  email: Joi.string().required(),
  phoneNumber: Joi.number().required().min(9),
  message: Joi.string().required().min(6).max(64),
});

export default {
  createContactSchema,
};
