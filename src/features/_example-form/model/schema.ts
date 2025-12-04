import { z } from "zod";

export const exampleFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  email: z.string().email("Invalid email address"),
  description: z.string().optional(),
});

export type ExampleFormData = z.infer<typeof exampleFormSchema>;
