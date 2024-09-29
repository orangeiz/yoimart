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
  DialogDescription,
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
import { foodreviewSchema } from "@/lib/zod";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Clock, Heart, ShoppingBag, StarIcon } from "lucide-react";

export const ShowFoodModal = () => {
  const { data: session } = useSession();
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isPending, startTransition] = useTransition();
  const { isOpen, OnClose, type, data } = UseModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "showFood";
  const { DeliveryFood,Category } = data;
  const User = session?.user;
  type FormData = z.infer<typeof foodreviewSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(foodreviewSchema),
    defaultValues: { comment: "", rating: 0 },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormData) => {
    try {
      const response = await axios.post(`/api/foodreviews`, { ...values, ownerId: User?.id });
      setFormSuccess("Review Created Successfully");
      setFormError("");
      form.reset();
      router.refresh();
      OnClose();
    } catch (error: any) {
      setFormError(error.message);
      setFormSuccess("");
    }
  };

  const handleClose = () => {
    OnClose();
  };

  if (!session) {
    return null;
  }
  const restaurantName = DeliveryFood?.restaurant?.name;
  const categoryName = Category?.name;
  const originalprice=DeliveryFood?.originalprice;
  const discountPer=DeliveryFood?.discountPer;
  const discountedPrice = originalprice && discountPer !== null && discountPer !== undefined
  ? originalprice - (originalprice * discountPer / 100) : originalprice;
    return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-custom6 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold text-black">
            {DeliveryFood?.name || "Food Details"}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <div className="p-2 relative h-[250px] w-full">
              <Image className="border-3 rounded-lg bg-custom7 border-custom7 object-cover group-hover:border-custom4" fill src={DeliveryFood?.imageUrl?.[0] as string} alt=''/>
              <div className="absolute bottom-2 left-2 right-2 z-10 flex flex-row justify-end items-center px-4 gap-x-2">
              <div className="text-custom4 text-xl font-satoshi font-semibold">
               {DeliveryFood?.ratings}
              </div>
              <StarIcon size={20} className="text-white fill-white bg-green-700"/>
              </div>
            </div>
            {restaurantName && (
              <div className=" p-2 flex gap-x-2  justify-center items-center text-custom5 font-satoshi text-xl font-bold">
                <div>Restaurant: </div>{restaurantName}
                <div className="text-emerald-400 font-satoshi font-bold text-2xl">
                  15 mins    
                </div>
                <Clock size={20} className="text-custom4"/>
              </div>
            )}
            {categoryName && (
              <div className=" p-2 flex justify-center items-center text-custom5 font-satoshi text-xl font-bold">
                <div>Category: </div>{categoryName}
              </div>
            )}
            <div className="text-3xl  font-extrabold text-custom4 font-satoshi ">
              Description
            </div>
            <div className=" p-2 flex justify-center items-center text-custom5 font-satoshi text-xl font-bold">
                {DeliveryFood?.description}
              </div>
            <div className='flex flex-row gap-x-1 items-center justify-center "'>
              <div className="font-bold text-2xl font-satoshi text-red-600 line-through">
                    {originalprice}₹
                </div>
                {discountedPrice&&(
                  <div className="font-semibold text-2xl text-black">
                  {discountedPrice.toFixed(2)}₹
                </div>
                )}
                <span className="font-bold text-xl font-satoshi text-orange-500">
                    {discountPer}% Off
                </span>
            </div>
            <div className='flex flex-row justify-center p-2  items-center gap-x-4'>
            <Button className='h-[64px] w-[200px] group flex flex-row gap-x-2 bg-orange-500 border-5 border-transparent hover:border-custom2' onClick={()=>{}}>
              <div className='font-bold  font-satoshi  text-2xl group-hover:text-emerald-400 text-custom3'>
                Add to Cart
              </div>
              <ShoppingBag size={20} className='text-custom3 group-hover:text-emerald-400' />
            </Button>
            <div className='relative'>
              <Heart 
                className='text-custom4 hover:text-red-500' 
                size={20} 
              />
              <Heart 
                className='absolute top-0 left-0 text-red-500 opacity-0 hover:opacity-100' 
                size={20} 
                fill='currentColor' 
              />
          </div>
          </div>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              {formSuccess && <FormSuccess message={formSuccess} />}
              {formError && <FormError message={formError} />}
              <FormField
                control={form.control}
                name="comment"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Comment <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Leave your review here"
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isPending}
                        {...field}
                        placeholder="Rate the food from 1 to 5"
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <DialogFooter className="flex items-center justify-center px-6 py-4">
                <Button  type="submit" variant="primary" disabled={isLoading}>
                  Submit Review
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
