import { z } from "zod";

const userZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user"]).default("user"),
  isBlocked: z.boolean().default(false),
});

// Example of using the schema to validate data
const validateUser = (data: unknown) => {
  try {
    const parsedData = userZodSchema.parse(data);
    console.log("Valid data:", parsedData);
    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
    }
    throw error;
  }
};

export { userZodSchema, validateUser };
