import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { register } from "module";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Edit } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const UploadButton = ({ label, register, errors }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-start">
        <Label
          htmlFor="upload-button"
          className="flex gap-2 p-3 rounded-lg bg-muted text-gray-600 cursor-pointer font-semibold text-sm items-center px-4"
        >
          <Input
            className="hidden"
            {...register("image")}
            type="file"
            id="upload-button"
          />
          <Edit />
          {label}
        </Label>
        <p className="text-sm text-gray-400 ml-6">
          Recommended size is 300px * 300px, size <br /> less than 2MB
        </p>
      </div>
      <ErrorMessage
        errors={errors}
        name="image"
        render={({ message }) => (
          <p className="text-red-400 mt-2">
            {message === "Required" ? "" : message}
          </p>
        )}
      />
    </>
  );
};

export default UploadButton;
