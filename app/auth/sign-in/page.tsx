import SignInFormProvider from "@/components/forms/sign-in/form-provider";
import LoginForm from "@/components/forms/sign-in/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
const SignInPage = () => {
  return (
    <div className="w-full flex-1">
      <div>
        <SignInFormProvider>
          <LoginForm />
          <div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
          <p>
            Don’t have an account?{" "}
            <Link href="/auth/sign-up" className="font-bold">
              Create one
            </Link>
          </p>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignInPage;
