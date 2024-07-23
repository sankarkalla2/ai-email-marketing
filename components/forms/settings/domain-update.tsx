import { DomainSettingsProps } from "@/schemas/settings.schema";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";

type Props = {
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: FieldErrors<FieldValues>;
};

const DomainUpdate = ({ register, name, errors }: Props) => {
  return (
    <div className="flex gap-2 pt-5 items-end w-[400px]">
      <FormGenerator
        label="Domain Name"
        register={register}
        name="domain"
        errors={errors}
        type="text"
        inputType="input"
        placeholder={name}
      />
    </div>
  );
};

export default DomainUpdate;
