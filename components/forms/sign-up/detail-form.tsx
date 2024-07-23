import { USER_REGISTRATION_FORM } from "@/constants/forms";
import {
  FieldErrors,
  FieldValue,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import FormGenerator from "../form-generator";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
const DetailForm = ({ register, errors }: Props) => {
  return (
    <>
      <h2>Account Details</h2>
      <p>Enter you email</p>
      {USER_REGISTRATION_FORM.map((field) => {
        console.log(field.name)
        return (
          <FormGenerator
            key={field.id}
            {...field}
            errors={errors}
            register={register}
            name={field.name}
          />
        );
      })}
    </>
  );
};

export default DetailForm;
