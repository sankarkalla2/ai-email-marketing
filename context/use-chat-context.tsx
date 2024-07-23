"use client";

import React, { useContext, createContext, useState } from "react";
import { cn } from "@/lib/utils";

type ChatInitialValueProps = {
  realtime: boolean;
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoom: string | undefined;
  setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>;
  chats: {
    message: string;
    id: string;
    role: "assistant" | "user" | null;
    createdAt: Date;
    seen: boolean;
  }[];
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        id: string;
        role: "assistant" | "user" | null;
        createdAt: Date;
        seen: boolean;
      }[]
    >
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const chatInitialValues: ChatInitialValueProps = {
  chatRoom: undefined,
  setChatRoom: () => undefined,
  chats: [],
  setChats: () => undefined,
  loading: false,
  setLoading: () => undefined,
  realtime: false,
  setRealtime: () => undefined,
};

const chatContext = createContext(chatInitialValues);

const { Provider } = chatContext;

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState(chatInitialValues.chats);
  const [loading, setLoading] = useState(chatInitialValues.loading);
  const [chatRoom, setChatRoom] = useState(chatInitialValues.chatRoom);
  const [realtime, setRealtime] = useState(chatInitialValues.realtime);

  const values = {
    chats,
    setChats,
    loading,
    setLoading,
    chatRoom,
    setChatRoom,
    realtime,
    setRealtime,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useChatContext = () => {
  const state = useContext(chatContext);
  return state;
};
