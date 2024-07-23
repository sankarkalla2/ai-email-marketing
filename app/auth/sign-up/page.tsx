import ButtonHandler from "@/components/forms/sign-up/button-handler";
import SignUpFormProvider from "@/components/forms/sign-up/form-provider";
import HighlightSteps from "@/components/forms/sign-up/highlight-steps";
import RegistrationFormStep from "@/components/forms/sign-up/registration-step";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const SignInPage = () => {
  return (
    <div>
      <SignUpFormProvider>
        <div className="flex flex-col gap-3 h-full">
          <RegistrationFormStep />
          <ButtonHandler />
        </div>
        <div className="pt-10">
          <HighlightSteps />
        </div>
      </SignUpFormProvider>
    </div>
  );
};

export default SignInPage;
