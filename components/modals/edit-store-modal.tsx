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
import {  editStoreSchema } from "@/lib/zod";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { storeType } from "@/lib/schema";

export const EditStoreModal =() => {
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const { isOpen, OnClose, type, data } = UseModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "editStore";
  const { Store } = data;
  type FormData = z.infer<typeof editStoreSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(editStoreSchema),
    defaultValues: { name:"", type:"food" },
  });

  useEffect(() => {
    if (Store) {
      form.setValue("name", Store?.name??"");
      form.setValue("type", Store?.type??"");
    }
  }, [form, Store]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormData) => {
    try {
      const response=await axios.patch(`/api/store/${Store?.id}`, values);
      const updatedStore=response.data;
      if(updatedStore)      
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
                name="type"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Store Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a store type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {storeType
                        .enumValues.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
