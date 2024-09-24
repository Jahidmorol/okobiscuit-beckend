import { z } from 'zod';

const ProductOverviewSchema = z
  .object({
    name: z.string({ required_error: 'Overview name is required' }),
    icon: z.string({ required_error: 'Overview icon is required' }),
    meta: z.string({ required_error: 'Overview meta is required' }),
  })
  .strict();

const ProductAdvantageSchema = z
  .object({
    bgImage: z.string().optional(),
    advantages: z.array(z.string()).optional(),
  })
  .strict();

const ProductSpecificationSchema = z
  .object({
    name: z.string({ required_error: 'Specification name is required' }),
    description: z.string({
      required_error: 'Specification description is required',
    }),
  })
  .strict();

const ProductCardSchema = z
  .object({
    image: z.string({ required_error: 'Card image is required' }),
    title: z.string({ required_error: 'Card title is required' }),
    subTitle: z.string().optional(),
  })
  .strict();

const ProductSchema = z.object({
  category: z.string({ required_error: 'Category is required' }),
  title: z.string({ required_error: 'Title is required' }),
  productImg: z.string({ required_error: 'Product Image is required' }),
  subTitle: z.string({ required_error: 'Sub-title is required' }),
  description: z.string({ required_error: 'Description is required' }),
  banner: z.string().optional(),
  overview: z.array(ProductOverviewSchema).optional(),
  advantage: ProductAdvantageSchema.optional(),
  specification: z.array(ProductSpecificationSchema).optional(),
  cards: z.array(ProductCardSchema).optional(),
  othersImages: z.array(z.string()).optional(),
});

export const createProductValidationSchema = z.object({
  body: ProductSchema.strict(),
});

export const updateProductValidationSchema = z.object({
  body: ProductSchema.partial().strict(),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
