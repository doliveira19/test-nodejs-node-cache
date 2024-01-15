import * as z from 'zod';

export const loginValidation = z.object({
  email: z.string(),
  password: z.string(),
}).strict();