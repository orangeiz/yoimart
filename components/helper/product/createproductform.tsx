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
import { addproductSchema } from "@/lib/zod";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import { useSession } from "next-auth/react";
import { FileUpload } from "../file-upload";
import { Checkbox } from "@/components/ui/checkbox";

export const CreateProductForm = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  type FormData = z.infer<typeof addproductSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(addproductSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      Colours: [],
      Sizes: [],
      Genders: [],
      images: [],
      Occasions:[],
      isArchived: false,
      isFeatured: false,
      COD:false,
      supplier:"",
      ageRated:0,
      noAvailable: 0,
      discountPer: 0,
      originalPrice:0,
      description:""
    },
  });

  const { fields: colourFields, append: appendColour, remove: removeColour } = useFieldArray({
    control: form.control,
    name: "Colours",
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control: form.control,
    name: "Sizes",
  });

  const { fields: genderFields, append: appendGender, remove: removeGender } = useFieldArray({
    control: form.control,
    name: "Genders",
  });
  const { fields: occasionFields, append: appendOccasion, remove: removeOccasion } = useFieldArray({
    control: form.control,
    name: "Occasions",
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormData) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/product",
        query: {
          id: params?.id,
        },
      });
      await axios.post(url, values);
      setFormSuccess("Product Created Successfully");
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
                    <Input  disabled={isPending} {...field} placeholder="Product Name" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplier"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                  Supplier <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input  disabled={isPending} {...field} placeholder="Product Name" />
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
                    <Input disabled={isPending} {...field} placeholder="describe your product" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-y-4">
            <FormLabel className="text-xl font-bold">
              Colours <span className="text-red-500">*</span>
              </FormLabel>
              {colourFields.map((field, index) => (
                <FormItem key={field.id}>
                  <FormLabel>Colour {index + 1}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        {...form.register(`Colours.${index}.name`)}
                        placeholder="Colour Name"
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        {...form.register(`Colours.${index}.hex`)}
                        placeholder="Colour Hex"
                      />
                    </FormControl>
                   
                    <Button
                      type="button"
                      onClick={() => removeColour(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                    <div
                      className="w-20 h-10 rounded-full"
                      style={{ backgroundColor: form.getValues(`Colours.${index}.hex`) }}
                    ></div>
                  </div>
                </FormItem>
              ))}
              <Button type="button"  className="p-2" onClick={() => appendColour({ name: "", hex: "" })}>
                Add Colour
              </Button>
            </div>

            <div className="flex flex-col gap-y-4">
            <FormLabel className="text-xl font-bold">
              Sizes <span className="text-red-500">*</span>
              </FormLabel>
              {sizeFields.map((field, index) => (
                <FormItem key={field.id}>
                  <FormLabel>Size {index + 1}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        {...form.register(`Sizes.${index}.name`)}
                        placeholder="Size"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => removeSize(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </FormItem>
              ))}
              <Button type="button"  className="p-2" onClick={() => appendSize({ name: "" })}>
                Add Size
              </Button>
            </div>
            <div className="flex flex-col gap-y-4">
            <FormLabel className="text-xl font-bold">
              Occasions <span className="text-red-500">*</span>
              </FormLabel>
              {occasionFields.map((field, index) => (
                <FormItem key={field.id}>
                  <FormLabel>Occasion {index + 1}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        {...form.register(`Occasions.${index}.name`)}
                        placeholder="Occasions"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => removeOccasion(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </FormItem>
              ))}
              <Button type="button"  className="p-2" onClick={() => appendOccasion({ name: "" })}>
                Add Occasions
              </Button>
            </div>
            <div className="flex flex-col gap-y-4">
            <FormLabel className="text-xl font-bold">
             Genders <span className="text-red-500">*</span>
              </FormLabel>
              {genderFields.map((field, index) => (
                <FormItem key={field.id}>
                  <FormLabel>Gender {index + 1}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        {...form.register(`Genders.${index}.name`)}
                        placeholder="Gender"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => removeGender(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </FormItem>
              ))}
              <Button type="button"  className="p-2" onClick={() => appendGender({ name: "" })}>
                Add Gender
              </Button>
            </div>

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
              name="ageRated"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Rated For Age+ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...field}
                      placeholder="Age Rated"
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
