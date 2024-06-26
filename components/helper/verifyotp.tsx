import { OtpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from "../ui/button";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";
interface VerifyOtpProps {
  email: string;
  phone: string;
  onSubmit: () => void;
}

 export const VerifyOtp = ({ email, phone, onSubmit }: VerifyOtpProps) => {
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const otpform = useForm({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof OtpSchema>) => {
    try {
      const data = { ...values, email, phone };
      console.log("Submitting OTP with data:", data); // Debugging
      await axios.post('/api/verify-otp', data);
      setFormSuccess('OTP has been verified');
      onSubmit();
    } catch (error: any) {
      setFormError(error.response?.data || error.message);
    }
  };

  return (
    <Form {...otpform}>
      <form onSubmit={otpform.handleSubmit(handleFormSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={otpform.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {formError && <FormError message={formError} />}
      {formSuccess && <FormSuccess message={formSuccess} />}
    </Form>
  );
};