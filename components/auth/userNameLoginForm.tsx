"use client"
import * as z from "zod"
import React, { useTransition } from 'react';
import CardWrapper from "../forms/CardWrapper";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernamesignInSchema } from "@/lib/zod";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import FormError from "../forms/form-error";
import FormSuccess from "../forms/form-success";

const UserNameLoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof usernamesignInSchema>>({
        resolver: zodResolver(usernamesignInSchema),
        defaultValues: {  username: "", password: "" }
    });

    const onSubmit =  (values: z.infer<typeof usernamesignInSchema>) => {
        startTransition(()=>{
            login(values)
        })
    };

    return (
        <CardWrapper
            headerlabel="Welcome Back"
            backbuttonlabel="Don't have an account?"
            changeoptionlabel="Change login method"
            forgotpasswordlabel=""
            backhref="/register"
            showSocials
            changeoptionhref="/login"
            forgotpasswordhref=""
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    <FormField
                                control={form.control}
                                name="username"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input  disabled={isPending} {...field} placeholder="your username" type="text" />
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
                    <FormError message=""/>
                    <FormSuccess message=""/>
                    <Button type="submit"  disabled={isPending}className="w-full">
                    {isPending?"Logging in":"Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default UserNameLoginForm
