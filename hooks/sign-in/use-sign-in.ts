import { useToast } from "@/components/ui/use-toast";
import { UserLoginSchema, UserLoginSchemaProps } from "@/schemas/auth-schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();
  const methods = useForm<UserLoginSchemaProps>({
    mode: "onChange",
    resolver: zodResolver(UserLoginSchema),
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginSchemaProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          router.push("/dashboard");
        }
      } catch (err: any) {
        setLoading(false);
        if (err.errors[0].code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "email/password is incorrect try again",
          });
        }
      }
    }
  );

  return {
    onHandleSubmit,
    methods,
    loading,
  };
};
