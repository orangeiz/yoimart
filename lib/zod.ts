import { profile } from "console";
import * as z from "zod";
import { restaurents, storeType, subcategories } from "./schema";
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
export const storeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(['food', 'shop']),
});
export const editStoreSchema=z.object({
  name:z.string().min(1,{message:"Name is required"}),
  type:z.enum(['food','shop',''])
})
export  const billbordSchema=z.object({
  name:z.string().min(1,{message:"Name is required"}),
  imageUrl:z.string()
})
export const editBillboardSchema=z.object({
  name:z.string().min(1,{message:"Name is required"}),
  imageUrl:z.string()
})
const colourSchema = z.object({
  name: z.string().min(1, { message: "Colour name is required" }),
  hex: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: "Invalid hex colour code" })
});
const sizeSchema=z.object({  
  name: z.string().min(1, { message: "Size name is required" }),
})
const genderschema=z.object({
  name: z.string().min(1, { message: "Gender name is required" }),
})
const occasionSchema=z.object({
  name: z.string().min(1, { message: "Occasion name is required" }),
})
export const addproductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description:z.string().min(1,{message:"Description is required"}),
  category: z.string().min(1, { message: "Category required" }),
  subcategory: z.string().min(1, { message: "Subcategory required" }),
  Colours: z.array(colourSchema).nonempty({ message: "At least one colour is required" }),
  Sizes: z.array(sizeSchema).nonempty({ message: "At least one size is required" }),
  Genders: z.array(genderschema).nonempty({ message: "At least one gender is required" }),
  images: z.array(z.string()).nonempty({ message: "At least one image is required" }),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  COD:z.boolean(),
  noAvailable: z.string().transform((val) => parseInt(val, 10)),
  discountPer: z.string().transform((val) => parseInt(val, 10)),
  originalPrice: z.string().transform((val) => parseInt(val, 10)),
  ageRated:z.string().transform((val)=>parseInt(val,10)),
  Occasions:z.array(occasionSchema).nonempty({ message: "At least one occasion is required" }),
  supplier:z.string().min(1, { message: " Supplier is required" }),
});
export const editproductSchema=z.object({ name: z.string().min(1, { message: "Name is required" }),
description:z.string().min(1,{message:"Description is required"}),
category: z.string().min(1, { message: "Category required" }),
subcategory: z.string().min(1, { message: "Subcategory required" }),
Colours: z.array(colourSchema).nonempty({ message: "At least one colour is required" }),
Sizes: z.array(sizeSchema).nonempty({ message: "At least one size is required" }),
Genders: z.array(genderschema).nonempty({ message: "At least one gender is required" }),
images: z.array(z.string()).nonempty({ message: "At least one image is required" }),
isArchived: z.boolean(),
isFeatured: z.boolean(),
COD:z.boolean(),
noAvailable: z.string().transform((val) => parseInt(val, 10)),
discountPer: z.string().transform((val) => parseInt(val, 10)),
originalPrice: z.string().transform((val) => parseInt(val, 10)),
ageRated:z.string().transform((val)=>parseInt(val,10)),
Occasions:z.array(occasionSchema).nonempty({ message: "At least one occasion is required" }),
supplier:z.string().min(1, { message: " Supplier is required" }),
  
})
export const adddeliveryfoodSchema=z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description:z.string().min(1,{message:"Description is required"}),
  category: z.string().min(1, { message: "Category required" }),
  subcategory: z.string().min(1, { message: "Subcategory required" }),
  images: z.array(z.string()).nonempty({ message: "At least one image is required" }),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  COD:z.boolean(),
  noAvailable: z.string().transform((val) => parseInt(val, 10)),
  discountPer: z.string().transform((val) => parseInt(val, 10)),
  originalPrice: z.string().transform((val) => parseInt(val, 10)),
  restaurentAddress:z.string(),
  restaurentName:z.string(),
  restaurentImage:z.string()
})
export const editdeliveryfoodSchema=z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description:z.string().min(1,{message:"Description is required"}),
  category: z.string().min(1, { message: "Category required" }),
  subcategory: z.string().min(1, { message: "Subcategory required" }),
  images: z.array(z.string()).nonempty({ message: "At least one image is required" }),
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
  COD:z.boolean(),
  noAvailable: z.string().transform((val) => parseInt(val, 10)),
  discountPer: z.string().transform((val) => parseInt(val, 10)),
  originalPrice: z.string().transform((val) => parseInt(val, 10)),
  restaurentAddress:z.string(),
  restaurentName:z.string(),
  restaurentImage:z.string()
})