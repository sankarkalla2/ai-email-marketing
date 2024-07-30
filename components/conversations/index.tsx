"use client";
import { useConversation } from "@/hooks/conversations/user-conversation";
import React from "react";
import TabsMenu from "../tabs";
import { TABS_MENU } from "@/constants/menu";
import { TabsContent } from "../ui/tabs";
import ConversationalSearch from "./conversational-search";
import { Loader } from "../loader";
import { CardDescription } from "../ui/card";
import ChatCard from "./chat-card";
import { Separator } from "../ui/separator";

type Props = {
  domains?: { name: string; icon: string; id: string }[] | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { register, loading, onGetActiveChatMessages, chatRooms } =
    useConversation();

  return (
    <div className="py-3">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <ConversationalSearch register={register} domains={domains} />
          <div>
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription>No chats for you domain</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all">all</TabsContent>
        <TabsContent value="expired">expired</TabsContent>
        <TabsContent value="starred">starred</TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ConversationMenu;
