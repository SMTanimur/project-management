import * as z from 'zod';
const userSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a valid string',
    })
    .trim()
    .min(2, { message: 'First name is must be 2 or more characters long' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email({ message: 'Invalid email address' }),

  lastName: z

    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a valid string',
    })
    .trim()
    .min(2, { message: 'Last name is must be 2 or more characters long' }),
  avatar: z

    .string({
      required_error: 'Avatar  is required',
      invalid_type_error: 'Avatar  must be a valid string',
    })
    .trim()
    .min(2, { message: 'Avatar  is must be 2 or more characters long' }),
  contact: z

    .string({
      invalid_type_error: 'Contact  must be a valid string',
    })
    .min(11, { message: 'Contact  is must be 2 or more characters long' }),
  password: z

    .string({
      required_error: 'Password  is required',
      invalid_type_error: 'Password  must be a valid string',
    })
    .trim()
    .min(8, { message: 'Password  is must be 2 or more characters long' }),
});
export const createUserSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  contact: true,
  password: true,
  
});

export type TCreateUser = z.infer<typeof createUserSchema>;




