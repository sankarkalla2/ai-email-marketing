import { UserLoginSchema } from "@/schemas/auth-schema";

type UserRegisrationProps = {
  id: string;
  type: "email" | "password" | "text";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};
export const USER_REGISTRATION_FORM: UserRegisrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Full name",
    name: "fullname",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Confirm Email",
    name: "confirmEmail",
    type: "text",
    label: "Confirm Email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    id: "5",
    inputType: "input",
    placeholder: "Confirm Passoword",
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
  },
];

export type UserLoginProps = {
  id: string;
  label?: string;
  type: "text" | "password";
  placeholder: string;
  name: string;
  inputType: "select" | "input" | "textarea";
};

export const USER_LOGIN_FORM: UserLoginProps[] = [
  {
    id: "1",
    name: "email",
    placeholder: "Enter your email",
    type: "text",
    inputType: "input",
  },
  {
    id: "2",
    name: "password",
    placeholder: "Enter your passoword",
    type: "password",
    inputType: "input",
  },
];
