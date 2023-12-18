import * as z from "zod";

export const userInformationSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => value.trim() !== "", {
      message: "Username is required",
    }),
  city: z
    .string()
    .refine((value) => value.trim() !== "", { message: "City is required" }),
  country: z
    .string()
    .refine((value) => value.trim() !== "", { message: "Country is required" }),
});
