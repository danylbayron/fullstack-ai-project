import { z } from "zod";

// Zod schema for form validation
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

export type UserFormData = z.infer<typeof userSchema>;

export interface User {
  id: number;
  name: string;
  email: string;
}
