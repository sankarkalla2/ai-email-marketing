import HeadingLabel from "@/components/heading";
import UploadButton from "@/components/upload-button";
import { BotIcon } from "@/icons/bot-icon";
import Image from "next/image";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const EditChatbotIcon = ({ register, errors, chatBot }: Props) => {
  return (
    <div className="flex flex-col gap-5 items-start py-5">
      <HeadingLabel
        label="Chatbot icon"
        message="change the icon for the  chatbot"
      />
      <UploadButton label="Edit image" register={register} errors={errors} />

      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="bot"
            width={80}
            height={80}
          />
        </div>
      ) : (
        <div className="rounded-full flex cursor-pointer shadow-md w-20 h-20 items-center justify-center bg-amber-500">
          <BotIcon />
        </div>
      )}
    </div>
  );
};

export default EditChatbotIcon;
