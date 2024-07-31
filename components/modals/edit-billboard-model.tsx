"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UseModal } from "../hooks/use-modal-store";
import { useEffect, useState, useTransition } from "react";
import {  editBillboardSchema, editStoreSchema } from "@/lib/zod";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FileUpload } from "../helper/file-upload";

export const EditBillboardModal =() => {
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const { isOpen, OnClose, type, data } = UseModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "editBillboard";
  const { Billboard } = data;
  type FormData = z.infer<typeof editBillboardSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(editBillboardSchema),
    defaultValues: { name:"", imageUrl:"" },
  });

  useEffect(() => {
    if (Billboard) {
      form.setValue("name", Billboard?.name??"");
      form.setValue("imageUrl", Billboard?.imageUrl??"");
    }
  }, [form, Billboard]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormData) => {
    try {
      const response=await axios.patch(`/api/billboard/${Billboard?.id}`, values);
      const updatedBillboard=response.data;
      if(updatedBillboard)      
        setFormSuccess("Updated Successfully");
      setFormError("");
      form.reset();
      router.refresh();
      OnClose();
    } catch (error:any) {
      setFormError(error.message);
      setFormSuccess("");
    }
  };

  const handleClose = () => {
    OnClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-pink-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-black">
            Edit your store
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give details of your store
          </DialogDescription>
        </DialogHeader>
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
              <DialogFooter className=" flex items-center justify-center px-6 py-4">
                <Button variant="primary" disabled={isLoading}>
                  Update
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
