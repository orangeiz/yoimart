'use client';
import * as z from 'zod';
import React, { useState, useTransition } from 'react';
import axios from 'axios';
import CardWrapper from '../forms/CardWrapper';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailsignInSchema } from '@/lib/zod';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import FormError from '../forms/form-error';
import FormSuccess from '../forms/form-success';
import { SendOTP } from '../helper/sendotp';
import { VerifyOtp } from '../helper/verifyotp';
import { useRouter } from 'next/navigation';

const EmailLoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const form = useForm<z.infer<typeof emailsignInSchema>>({
    resolver: zodResolver(emailsignInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof emailsignInSchema>) => {
    console.log('Form Submitted', values);
    setShowOtpForm(true);
    setUserEmail(values.email);
    setUserPhone('');
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
    console.log('Verifying OTP for email:', userEmail);
    try {
      const response = await axios.patch('/api/verify-user', { email: userEmail, emailVerified: true });
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
            identifier: userEmail,
            password: form.getValues('password'),
            redirect: false,
          });

          console.log('SignIn Result:', result);

          if (result?.error) {
            setFormError('Invalid Credentials');
          } else {
            const { data: session } = useSession();
            const userId = session?.user?.id;
            router.push(`/dashboard/${userId}`);
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
      forgotpasswordhref="/email/forgotpassword"
    >
      {!showOtpForm && !otpSent && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} placeholder="john123@gmail.com" type="email" />
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

export default EmailLoginForm;
