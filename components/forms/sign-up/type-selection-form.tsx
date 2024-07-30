import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

type TypeSelectionFormProps = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};
const TypeSelectionForm = ({
  register,
  userType,
  setUserType,
}: TypeSelectionFormProps) => {
  return (
    <>
      <h2 className="text-xl md:text-4xl font-bold">Create an account</h2>
      <p className="text-sm  text-muted-foreground pb-2">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <div className="flex flex-col gap-y-3">
        <UserTypeCard
          register={register}
          value="owner"
          userType={userType}
          setUserType={setUserType}
          title="I Own a bussiness"
          description="Setting up my account for my company"
        />
        <UserTypeCard
          register={register}
          value="student"
          userType={userType}
          setUserType={setUserType}
          title="I am a student"
          description="Looking to learn about tool"
        />
      </div>
    </>
  );
};

export default TypeSelectionForm;
