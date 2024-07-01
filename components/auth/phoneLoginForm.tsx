"use client"
import * as z from "zod"
import React, { useState, useTransition } from 'react';
import axios from 'axios';
import CardWrapper from "../forms/CardWrapper";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { phonesignInSchema } from "@/lib/zod";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";
import { SendOTP } from "../helper/sendotp";
import { VerifyOtp } from "../helper/verifyotp";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const PhoneLoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [formSuccess, setFormSuccess] = useState("");
    const [formError, setFormError] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const router=useRouter()
    const form = useForm<z.infer<typeof phonesignInSchema>>({
        resolver: zodResolver(phonesignInSchema),
        defaultValues: { phone: "", password: "" }
    });

    const onSubmit = (values: z.infer<typeof phonesignInSchema>) => {
            console.log('Form Submitted', values);
            setShowOtpForm(true);
            setUserEmail('');
            setUserPhone(values.phone);
            setFormSuccess('');
            setFormError('');
    };

    const handleOtpSent = (sent: boolean) => {
        console.log('OTP Sent:', sent);
        if (sent) {
          setFormSuccess('OTP has been sent successfully');
          setOtpSent(true);
        } else {
          setFormError('Failed to send OTP');
        }
      };
      const handleOtpVerified = async () => {
        console.log('Verifying OTP for Phone:', userPhone);
        try {
          const response = await axios.patch('/api/verify-user', { phone: userPhone, otpVerified: true });
          console.log('OTP Verification Response:', response.data);
          if (response.data.success) {
            setFormSuccess('OTP Verified successfully');
            setOtpVerified(true);
            setShowOtpForm(false);
          } else {
            setFormError('Failed to verify OTP');
          }
        } catch (error) {
          console.error('OTP Verification Error:', error);
          setFormError('An error occurred during OTP verification');
        }
      };
      const handleFinalSubmit = async () => {
        if (otpSent && otpVerified) {
          startTransition(async () => {
            try {
              const result = await signIn('credentials', {
                identifier: userPhone,
                password: form.getValues('password'),
                redirect: false,
              });
    
              console.log('SignIn Result:', result);
    
              if (result?.error) {
                setFormError('Invalid Credentials');
              } else {
                router.push(`/`);
              }
            } catch (error) {
              console.error('Login Error:', error);
              setFormError('Invalid Credentials');
            }
          });
        } else {
          setFormError('Please verify OTP first');
        }
      };
      return (
        <CardWrapper
          headerlabel="Welcome Back"
          backbuttonlabel="Don't have an account?"
          changeoptionlabel="Change login method"
          forgotpasswordlabel="Forget your password?"
          backhref="/register"
          showSocials
          changeoptionhref="/login"
          forgotpasswordhref="/forgotpassword"
        >
          {!showOtpForm && !otpSent && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                        <Input disabled={isPending} {...field} placeholder="+1234567890" type="tel" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} placeholder="********" type="password" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={formError} />
                <FormSuccess message={formSuccess} />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? 'Logging in' : 'Login'}
                </Button>
              </form>
            </Form>
          )}
          {!otpSent && showOtpForm && (
            <SendOTP email={userEmail} phone={userPhone} purpose="login" onOtpSent={handleOtpSent} onResendOTP={() => {}} />
          )}
          {!otpVerified && showOtpForm && (
            <VerifyOtp email={userEmail} phone={userPhone} onSubmit={handleOtpVerified} />
          )}
          {otpSent && otpVerified && (
            <Button onClick={handleFinalSubmit} disabled={isPending} className="w-full">
              {isPending ? 'Finalizing Login' : 'Submit'}
            </Button>
          )}
        </CardWrapper>
      );
    };

export default PhoneLoginForm;
