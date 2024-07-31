import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { adddeliveryfoodSchema, addproductSchema } from "@/lib/zod";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import { useSession } from "next-auth/react";
import { FileUpload } from "../file-upload";
import { Checkbox } from "@/components/ui/checkbox";

export const CreateFoodForm = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  type FormData = z.infer<typeof adddeliveryfoodSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(adddeliveryfoodSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      images: [],
      isArchived: false,
      isFeatured: false,
      COD:false,
      restaurentName:"",
      restaurentImage:"",
      restaurentAddress:"",
      noAvailable: 0,
      discountPer: 0,
      originalPrice:0,
      description:""
    },
  });

 
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormData) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/food",
        query: {
          id: params?.id,
        },
      });
      await axios.post(url, values);
      setFormSuccess("Delivery Food Created Successfully");
      setFormError("");
      form.reset();
      router.refresh();
    } catch (error: any) {
      setFormError(error.message);
      setFormSuccess("");
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8 px-6">
            {formSuccess && <FormSuccess message={formSuccess} />}
            {formError && <FormError message={formError} />}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input  disabled={isPending} {...field} placeholder="Food Name" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="restaurentName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                  Restaurent Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input  disabled={isPending} {...field} placeholder="Restaurent Name" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="restaurentAddress"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                  Restaurent Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input  disabled={isPending} {...field} placeholder="Restaurent Name" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Category" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Subcategory <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Subcategory" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Describe your product" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Product Images <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="multipleImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-center  space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox className="border-black rounded-none border-2 h-5 w-5"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                <FormLabel className="text-xl font-bold">
                Archived
                </FormLabel>
                </div>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-center  space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="border-black rounded-none border-2 h-5 w-5"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                  <FormLabel className="text-xl font-bold">Featured</FormLabel>
                </div>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="COD"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-center  space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox className="border-black rounded-none border-2 h-5 w-5"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                <FormLabel className="text-xl font-bold">
                Cash on delivery
                </FormLabel>
                </div>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="restaurentImage"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Restaurent Image <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="originalPrice"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    MRP <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...field}
                      placeholder="Product Price"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noAvailable"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Number Available <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...field}
                      placeholder="Number Available"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPer"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Discount Percentage <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...field}
                      placeholder="Discount Percentage"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" variant="primary" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
