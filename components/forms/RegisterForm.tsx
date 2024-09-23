"use client";

import { createUser } from "@/lib/actions/patient.action";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "../ui/form";
import CustomFeild from "../CustonFeild";
import { FormFeildType } from "./PatientForm";
import SubmitButton from "../SubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { genderOptions } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const user = {
        name,
        email,
        phone,
      };

      const newUser = await createUser(user);
      setIsLoading(false);
      if (newUser) router.push(`patients/${newUser.$id}/register`);
    } catch (error) {
      console.log("Patient form error", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-3 flex-1">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="  space-y-6  ">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFeild
          control={form.control}
          feildType={FormFeildType.INPUT}
          name={"name"}
          label={"Full Name"}
          placeholder={"Jone Doe"}
          iconSrc={"/assets/icons/user.svg"}
          iconAlt={"user"}
        />
        <div className="flex flex-col gap-6 w-full xl:flex-row ">
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.INPUT}
            name={"email"}
            label={"Email"}
            placeholder={"jonedoe@gmail.com"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"email"}
          />
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.PHONE_INPUT}
            name={"phone"}
            label={"Phone Number"}
            placeholder={"+00 0342 0453 34"}
            iconSrc={"/assets/icons/phone.svg"}
            iconAlt={"phone"}
          />
        </div>
        <div className="flex flex-col gap-6 w-full xl:flex-row ">
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.DATE_PICKER}
            name={"date"}
            label={"Date of Birth"}
            placeholder={"Select your birthday"}
            iconSrc={"/assets/icons/calendar.svg"}
            iconAlt={"calender"}
          />
          <CustomFeild
            control={form.control}
            feildType={FormFeildType.SKELETON}
            name={"gender"}
            label={"Gender"}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option}>
                        <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                      </RadioGroupItem>
                    </div>
                  ))}
                </RadioGroup> 
              </FormControl>
            )}
          />
        </div>
        <SubmitButton
          // isLoading={isLoading}
          className="bg-green-500 w-full hover:bg-green-500/90"
        >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
