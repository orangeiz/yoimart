'use client';

import {  useState, useTransition } from 'react';
import Step from '../forms/step';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { regInSchema } from '@/lib/zod';
import { Button } from '../ui/button';
import FormError from '../forms/form-error';
import FormSuccess from '../forms/form-success';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { login } from '@/actions/login';
import { FileUpload } from '../helper/file-upload';
import Preview from '../helper/preview';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SendOTP } from '../helper/sendotp';
import { VerifyOtp } from '../helper/verifyotp';


const RegisterForm = () => {
  const MAX_STEP = 2;
  const MIN_STEP = 0;
  const [step, setStep] = useState(0);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarimgUrl, setAvatarImgUrl] = useState('/images/defaultuser.png');
  const [avatarbackgroundimgUrl, setAvatarBackgroundImgUrl] = useState('/images/default-background.avif');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();

  type FormData = z.infer<typeof regInSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(regInSchema),
    defaultValues: { email: "", password: "", username: "" ,phone:""}
  });

  const resendOtp = () => {
    setOtpSent(false);
  };

  const createUser = async (values: FormData) => {
    setFormError('');
    setFormSuccess('');
    try {
      await axios.post("/api/users", {
        ...values,
        avatarimgUrl,
        avatarbackgroundimgUrl,
      });
      await setFormSuccess('You have successfully registered...Sign In');
      router.push('/login');
    } catch (error: any) {
      setFormError(error.response?.data || error.message);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      setFormSuccess('');
      setFormError('');
      startTransition(async () => {
        await login(values);
        setFormSuccess('Form submitted successfully!');
        setIsSubmitted(true);
        setUserName(values?.username);
        if (values.email)
          setEmail(values?.email||'');
        if (values.phone)
          setPhone(values?.phone);
        setAvatarImgUrl(values?.profileImg || avatarimgUrl);
        setAvatarBackgroundImgUrl(values?.profileBackgroundImg || avatarbackgroundimgUrl);
      });
    } catch (error: any) {
      setFormError('Invalid Credentials');
    }
  };

  const handleOtpVerification = () => {
    setOtpVerified(true);
  };

  const handleOtpSent = (sent: boolean) => {
    setOtpSent(sent);
  };

  const nextStep = () => {
    if (step === 0) setOtpSent(false);
    if (step < MAX_STEP) setStep(step + 1);
    setFormSuccess('');
    setFormError('');
  };
  const prevStep = () => {
    if (step === 1) {
      setIsSubmitted(false);
      setEmail('');
      setPhone('');
    }
    if (step > MIN_STEP) setStep(step - 1);
  };  
  


  return (
    <div>
      <div className="flex flex-row gap-x-5 border border-gray-400 my-5 py-5 mx-10 px-10 rounded-2xl ">
        <Step stepLabel="Registration" currentState={step === 0 ? 'current' : step > 0 ? 'completed' : 'pending'} Number={1} />
        <Step stepLabel="Verification" currentState={step === 1 ? 'current' : step > 1 ? 'completed' : 'pending'} Number={2} />
        <Step stepLabel="Preview" currentState={step === 2 ? 'current' : 'pending'} Number={3} />
      </div>

      {step === 0 && (
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
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="john_doe" />
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
                  <FormLabel>Phone </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder="1234567890" type="tel" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
    <FormField
              control={form.control}
              name="profileImg"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Profile Image URL</FormLabel>
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
            <FormField
              control={form.control}
              name="profileBackgroundImg"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Profile Background Image URL</FormLabel>
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
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
          {formError && <FormError message={formError} />}
          {formSuccess && <FormSuccess message={formSuccess} />}
        </Form>
      )}

      {step === 1 && (
        <div>
          {otpVerified ? (
            <Preview
              username={username}
              email={email}
              phone={phone}
              imgUrl={avatarimgUrl}
              backgroundimgUrl={avatarbackgroundimgUrl}
            />
          ) : (
            <div>
              <SendOTP email={email} phone={phone} purpose="verify" onOtpSent={handleOtpSent} onResendOTP={resendOtp} />
              {otpSent && <VerifyOtp email={email} phone={phone} onSubmit={handleOtpVerification} />}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <Preview
            username={username}
            email={email}
            phone={phone}
            imgUrl={avatarimgUrl}
            backgroundimgUrl={avatarbackgroundimgUrl}
          />
          <Button onClick={() => createUser(form.getValues())}>Complete Registration</Button>
          {formError && <FormError message={formError} />}
          {formSuccess && <FormSuccess message={formSuccess} />}
        </div>
      )}

      <div className="flex justify-between mt-10">
        <Button onClick={prevStep} disabled={step === MIN_STEP}>Previous</Button>
        <Button onClick={nextStep} disabled={step === MAX_STEP || (!otpSent && step === 1)}>Next</Button>
      </div>
    </div>
  );
};

export default RegisterForm


