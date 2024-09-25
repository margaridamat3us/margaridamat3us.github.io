import Joi from "joi";

//  Product = {
// name: string
// description: string
// imageUrl: string
// price: number
// }

const createProductSchema = Joi.object({
  title: Joi.string().required().min(3).max(32),
  imageUrl: Joi.string()
    .optional()
    .default(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NQ8PrCgOoYKc15vjM7oUbeKQvhhR62CryA&s"
    ),
  hoverImageUrl: Joi.string()
    .optional()
    .default(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NQ8PrCgOoYKc15vjM7oUbeKQvhhR62CryA&s"
    ),
  price: Joi.number().required().min(0),
});

export default {
  createProductSchema,
};
