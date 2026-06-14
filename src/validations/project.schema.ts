import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters long.")
    .max(80, "Project name must be at most 80 characters long."),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters long.")
    .optional()
    .or(z.literal("")),
});

export const updateProjectSchema = createProjectSchema.partial();