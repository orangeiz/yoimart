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
import {  billbordSchema, editBillboardSchema, editproductSchema } from "@/lib/zod";
import FormError from "@/components/forms/form-error";
import FormSuccess from "@/components/forms/form-success";
import { useSession } from "next-auth/react";
import { FileUpload } from "../file-upload";
import { Checkbox } from "@/components/ui/checkbox";
export const EditBillboardForm = () => {
    const params = useParams();
    const { data: session } = useSession();
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    type FormData = z.infer<typeof editBillboardSchema>;
    const {id}=params;
   
  const form = useForm<FormData>({
    resolver: zodResolver(editBillboardSchema),
    defaultValues: { name:"", imageUrl:"" },
  });
  const isLoading = form.formState.isSubmitting;
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get(`/api/billboard/${id}`);
        const { billboard } = data;
  
        form.setValue("name", billboard?.name??"");
        form.setValue("imageUrl", billboard?.imageUrl??"");
      } catch (error) {
        setFormError("Failed to fetch billboard data");
      }
    };
  
    if (params?.id) {
      fetchProductData();
    }
  }, [params?.id, form]);
  const onSubmit = async (values: FormData) => {
    try {
      const response=await axios.patch(`/api/billboard/${id}`, values);
      const updatedBillboard=response.data;
      if(updatedBillboard)      
        setFormSuccess("Updated Successfully");
      setFormError("");
      router.refresh();
    } catch (error:any) {
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
                    <FormLabel>
                      Name of store <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} placeholder="john_doe" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Billiboard Banner Image</FormLabel>
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
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} className="p-2">
                Save
              </Button>
            </div>
        </form>
      </Form>
    </div>
  )
}