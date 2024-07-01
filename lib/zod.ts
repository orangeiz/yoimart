import * as z from "zod";
export const regInSchema = z.object({
  email: z.string().email(({ message: "Invalid email" })).optional().or(z.literal('')),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
  username:z.string().min(7,{message:"Username should be atleast 7 character long"}),
  phone: z.string().regex(/^\+?[1-9]\d{6,14}$/, { message: "Invalid phone number" }).optional().or(z.literal('')),
  profileImg:z.string().optional().or(z.literal('')),
  profileBackgroundImg:z.string().optional().or(z.literal('')),  
});
export const emailsignInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string()
    .min(1, { message: "Password is required" })
});
export const usernamesignInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string()
    .min(1, { message: "Password is required" })
});
export const phonesignInSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{6,14}$/, { message: "Invalid phone number" }),
  password: z.string()
    .min(1, { message: "Password is required" })
});
export const OtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export const recoveryPasswordSchema=z.object({
  phone: z.string().regex(/^\+?[1-9]\d{6,14}$/, { message: "Invalid phone number" }).optional().or(z.literal('')),
  email: z.string().email(({ message: "Invalid email" })).optional().or(z.literal('')),
  password: z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
  confirmpassword:z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" })
})
export const editProfileSchema=z.object({
  username:z.string().min(7,{message:"Username should be atleast 7 character long"}),
  profileImg:z.string().optional().or(z.literal('')),
  profileBackgroundImg:z.string().optional().or(z.literal('')),  
})
