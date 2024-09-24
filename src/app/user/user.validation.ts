import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string({
      required_error: 'lastName is required',
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
      .refine(
        (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          const isLongEnough = value.length >= 8;

          return (
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar &&
            isLongEnough
          );
        },
        {
          message:
            'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character',
        },
      ),
  }),
});

const updateUserValidationSchema = z.object({
  body: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      photo: z.string().optional(),
    })
    .strict(),
});

export default createUserValidationSchema;

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
