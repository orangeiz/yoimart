'use client'
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
import {  editproductSchema } from "@/lib/zod";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import { useSession } from "next-auth/react";
import { FileUpload } from "../file-upload";
import { Checkbox } from "@/components/ui/checkbox";

export const EditProductForm = () => {
  const params = useParams();
  const { data: session } = useSession();
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  type FormData = z.infer<typeof editproductSchema>;
  const {id}=params
  const [productData, setProductData] = useState<FormData | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(editproductSchema),
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
  
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get(`/api/product/${id}`);
        const { product,colours,sizes,genders } = data;
  
        console.log("Product:", product);
        console.log("Product name:", product.name);
        console.log("Product category:", product.subcategory.category.name);
        console.log("Product subcategory:", product.subcategory.name);
  
        form.setValue("name", product.name);
        form.setValue("category", product.subcategory.category.name);
        form.setValue("subcategory", product.subcategory.name);
        form.setValue("Colours", colours.map((c: { name: string, hexValue: string }) => ({ name: c.name, hex: c.hexValue })));        form.setValue("Sizes", sizes);
        form.setValue("Genders", genders);
        form.setValue("images", product.imageUrl);
        form.setValue("Occasions", product.occasion.map((oc: string) => ({ name: oc })));
        form.setValue("isArchived", product.isArchived);
        form.setValue("isFeatured", product.isFeatured);
        form.setValue("COD", product.COD);
        form.setValue("supplier", product.supplier);
        form.setValue("ageRated", product.agerated.toString());
        form.setValue("noAvailable", product.noAvailable.toString());
        form.setValue("discountPer", product.discountPer.toString());
        form.setValue("originalPrice", product.originalprice.toString());
        form.setValue("description", product.description);
      } catch (error) {
        setFormError("Failed to fetch product data");
      }
    };
  
    if (params?.id) {
      fetchProductData();
    }
  }, [params?.id, form]);
  
  
  const onSubmit = async (values: FormData) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/product/${params?.id}`,
      });
      await axios.patch(url, values);
      setFormSuccess("Product Updated Successfully");
      setFormError("");
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
                        placeholder="occasion"
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
                Add occasion
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
            <div className="flex flex-col gap-y-4">
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
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isArchived"
                    />
                    <FormLabel htmlFor="isArchived">Archived</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isFeatured"
                    />
                    <FormLabel htmlFor="isFeatured">Featured</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="COD"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="COD"
                    />
                    <FormLabel htmlFor="COD">COD</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageRated"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      Age Rated <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} type="number" />
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
                      No Available <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} type="number" />
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
                      <Input disabled={isPending} {...field} type="number" />
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
                      Original Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} type="number" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} className="p-2">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
