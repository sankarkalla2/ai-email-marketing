"use client";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./type-selection-form";
import DetailForm from "./detail-form";
import OTPForm from "./otp-form";

const RegistrationFormStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"owner" | "student">("owner");

  setValue("otp", onOTP);
  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        ></TypeSelectionForm>
      );
      break;
    case 2:
      return <DetailForm errors={errors} register={register} />;

    case 3:
      return <OTPForm onOTP={onOTP} setOnOTP={setOnOTP} />;
  }
  return <div>RegistrationForm step</div>;
};

export default RegistrationFormStep;
