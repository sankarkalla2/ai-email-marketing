"use client"
import { Loader } from "@/components/loader";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";

import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { loading, methods, onHandleSubmit, onGenerateOtp } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div>
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};


export default SignUpFormProvider