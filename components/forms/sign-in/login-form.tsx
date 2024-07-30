"use client";
import { USER_LOGIN_FORM } from "@/constants/forms";
import React from "react";
import FormGenerator from "../form-generator";
import { useFormContext } from "react-hook-form";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="font-bold text-3xl">Login</h2>
      <p className="text-sm text-muted-foreground pb-5">
        You will recieve one time password
      </p>
      <div className="flex flex-col justify-center gap-y-3">
        {USER_LOGIN_FORM.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            errors={errors}
            register={register}
            name={field.name}
          />
        ))}
      </div>
    </>
  );
};

export default LoginForm;
