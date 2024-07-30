import TabsMenu from "@/components/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BOT_TABS_MENU } from "@/constants/menu";
import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import Image from "next/image";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import RealTime from "./real-time";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Bubble from "@/components/chatbot/bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from "@/components/ui/card";
import AccordionEle from "@/components/accordian";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpDesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpDesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
    },
    ref
  ) => {
    return (
      <div className="h-[600px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start flex-col">
            <h3 className="text-lg font-bold leading-none">
              Sales Rep - Web Prodigies
            </h3>
            <p className="text-sm">{domainName.split(".")[0]}</p>
            {realtimeMode?.mode && (
              <RealTime
                setCharts={setChat}
                chatRoomId={realtimeMode.chatroom}
              />
            )}
          </div>
          <div className="relative w-16 h-16">
            <Image
              src="https://ucarecdn.com/019dd17d-b69b-4dea-a16b-60e0f25de1e9/propuser.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          classname="bg-transparent border-[1px] m-2"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div
              style={{
                background: theme || "",
                color: textColor || "",
              }}
              className="px-3 flex h-[350px] flex-col py-5 gap-3 chat-window overflow-y-auto"
              ref={ref}
            >
              {chats.map((chat, key) => (
                <Bubble key={key} message={chat} />
              ))}
              {/* {onResponding && <Responding />} */}
            </div>
            <form
              onSubmit={onChat}
              className="flex px-3 py-1 flex-col flex-1 bg-muted"
            >
              <div className="flex justify-between">
                <Input
                  {...register("content")}
                  placeholder="Type your message..."
                  className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none"
                />
                <Button type="submit" className="mt-3">
                  <Send />
                </Button>
              </div>
              <Label htmlFor="bot-image">
                <Paperclip />
                <Input
                  {...register("image")}
                  type="file"
                  id="bot-image"
                  className="hidden"
                />
              </Label>
            </form>
          </TabsContent>
          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpDesk.map((desk) => (
                <Accordion type="single" collapsible>
                  <AccordionItem value={desk.id}>
                    <AccordionTrigger>{desk.question}</AccordionTrigger>
                    <AccordionContent>{desk.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
      </div>
    );
  }
);
