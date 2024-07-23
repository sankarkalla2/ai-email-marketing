"use client";
import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

const ButtonHandler = () => {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOtp } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (currentStep == 3) {
    return (
      <div className="">
        <Button type="submit" className="w-full">
          Create a Account
        </Button>
        <p>
          Already have an account <Link href={"/auth/sign-in"}>Sign in</Link>
        </p>
      </div>
    );
  }

  if (currentStep == 2) {
    
   
    return (
      <div>
        <Button
          type="submit"
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOtp(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                ),
            })}
        >
          Continue
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Continue
      </Button>
      <p>
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
