import { register } from "module";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
  register: UseFormRegister<FieldValues>;
};

const ConversationalSearch = ({ domains, register }: Props) => {
  return (
    <div className="flex flex-col py-3">
      <select
        {...register("domain")}
        className="px-3 py-4 border-[1px] rounded-lg mr-5"
      >
        <option disabled selected>
          Domain Name
        </option>
        {domains?.map((domain) => (
          <option value={domain.id} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConversationalSearch;
