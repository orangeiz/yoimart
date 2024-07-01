'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import FormError from '../forms/form-error';
import FormSuccess from '../forms/form-success';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SendOTP } from '../helper/sendotp';
import { VerifyOtp } from '../helper/verifyotp';
import { recoveryPasswordSchema } from '@/lib/zod';

const ForgotPasswordForm = () => {
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();

  type FormData = z.infer<typeof recoveryPasswordSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: { email: '', password: '', confirmpassword: '', phone: '' },
  });

  const changePassword = async (values: FormData) => {
    setFormError('');
    setFormSuccess('');
    try {
      await axios.patch('/api/forgot-password', {
        ...values,
        otpVerified: true, 
        emailVerified: true
      });
      setFormSuccess('You have successfully changed your password. Please sign in.');
      router.push('/login');
    } catch (error: any) {
      setFormError(error.response?.data || error.message);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      setFormSuccess('');
      setFormError('');
      console.log('Form Submitted', values);
      setShowOtpForm(true);
      if(values?.email)
      setUserEmail(values.email);
      if(values?.phone)
      setUserPhone(values.phone);
      if (values.password === values.confirmpassword) {
        setFormSuccess('Form submitted successfully!');
        setIsSubmitted(true);
      } else {
        setFormError('Passwords do not match');
        form.reset();
      }
    } catch (error: any) {
      setFormError('Invalid credentials');
    }
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
    console.log('Verifying OTP');
    try {
      const response = await axios.patch('/api/verify-user', { email: userEmail, phone: userPhone, otpVerified: true, emailVerified: true });
      console.log('OTP Verification Response:', response.data);
      if (response.data.success) {
        setFormSuccess('OTP verified successfully');
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

  return (
    <div>
      {!showOtpForm && !otpSent && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="+1234567890" type="phone" />
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
                  <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirm Password <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
          {formError && <FormError message={formError} />}
          {formSuccess && <FormSuccess message={formSuccess} />}
        </Form>
      )}
      {!otpSent && showOtpForm && (
        <SendOTP email={userEmail} phone={userPhone} purpose="login" onOtpSent={handleOtpSent} onResendOTP={() => {}} />
      )}
      {!otpVerified && showOtpForm && (
        <VerifyOtp email={userEmail} phone={userPhone} onSubmit={handleOtpVerified} />
      )}
      {otpSent && otpVerified && (
        <Button onClick={() => changePassword(form.getValues())} disabled={isPending} className="w-full">
          {isPending ? 'Changing Password' : 'Change Password'}
        </Button>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
