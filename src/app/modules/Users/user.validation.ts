import { z } from 'zod';

const createSellerValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      photo: z.string({
        required_error: 'photo is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email({
          message: 'Invalid email address',
        }),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(8, { message: 'Password must be at least 8 characters long' }),
    })
    .strict(),
});

const createUserValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      role: z.enum(['admin', 'seller'], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be either admin or seller',
      }),
      photo: z.string({
        required_error: 'photo is required',
      }),

      email: z
        .string({
          required_error: 'email is required',
        })
        .email({
          message: 'Invalid email address',
        }),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(8, { message: 'Password must be at least 8 characters long' }),
    })
    .strict(),
});

const updateUserValidationSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      photo: z.string().optional(),
    })
    .strict(),
});

export const UserValidation = {
  createSellerValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
};
