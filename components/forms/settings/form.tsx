"use client";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/settings/use-settings";
import React from "react";
import DomainUpdate from "./domain-update";
import CodeSnippet from "./code-snippet";
import PremiumBadge from "@/icons/premium-badge";
import EditChatbotIcon from "./edit-chat-icon";
import WelcomeMessage from "./greetings-message";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader } from "@/components/loader";

type Props = {
  id: string;
  name: string;
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatBot: {
    id: string;
    welcomeMessage: string | null;
    icon: string | null;
  } | null;
};

const SettingsForm = ({ id, name, plan, chatBot }: Props) => {
  const {
    register,
    onDeleteDomain,
    onUpdateSettings,
    errors,
    loading,
    deleting,
  } = useSettings(id);
  return (
    <div>
      <form onSubmit={onUpdateSettings} className="flex flex-col pb-10 gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Domain Settings</h2>
          <Separator />
          <DomainUpdate name={name} register={register} errors={errors} />
          <CodeSnippet id={id} />
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-2xl">ChatBot Settings</h2>
            <div className="flex items-center font-bold py-1 text-xs px-3 bg-slate-100 rounded-full">
              <PremiumBadge />
              Premium
            </div>
          </div>
          <Separator />
          <div className="grid md:grid-cols-2">
            <div>
              <EditChatbotIcon
                chatBot={chatBot}
                register={register}
                errors={errors}
              />
              <WelcomeMessage
                message={chatBot?.welcomeMessage!}
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <Image
                src={"/images/bot-ui.png"}
                alt="chatbot"
                height={500}
                width={500}
              />
            </div>
          </div>
          <div className="flex justify-end gap-x-2 items-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <Button variant={"destructive"} onClick={onDeleteDomain}>
                  Delete Domain
                </Button> */}
                <Button variant={"destructive"}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your domain and remove your related domain data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDeleteDomain}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit">
              <Loader loading={loading}>
                  Save
              </Loader>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
