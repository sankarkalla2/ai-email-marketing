import {
  onGetChatMessages,
  onGetDomainChatRooms,
  onOwnerSendMessage,
  onViewUnReadMessage,
} from "@/actions/conversations";
import { useChatContext } from "@/context/use-chat-context";
import { getMonthName } from "@/lib/utils";
import {
  ChatBotMessageSchema,
  ConversationSearchProps,
  ConversationSearchSchema,
} from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useConversation = () => {
  const { register, watch } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: "onChange",
  });

  const { setLoading: loadMessages, setChats, setChatRoom } = useChatContext();
  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string;
        createdAt: Date;
        message: {
          message: string;
          createdAt: Date;
          seen: boolean;
        }[];
      }[];
      email: string | null;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const search = watch(async (value) => {
      setLoading(true);
      try {
        const rooms = await onGetDomainChatRooms(value.domain!);
        if (rooms) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return search.unsubscribe();
  }, [watch]);

  const onGetActiveChatMessages = async (id: string) => {
    try {
      loadMessages(true);
      const messages = await onGetChatMessages(id);
      if (messages) {
        setChatRoom(id);
        loadMessages(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    onGetActiveChatMessages,
    chatRooms,
    loading,
  };
};

export const useChatTime = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext();
  const [messageSentAt, setMessageSentAt] = useState<string>();
  const [urgent, setUrgent] = useState<boolean>(false);

  const onSetMessageReceiveDate = () => {
    const dt = new Date(createdAt);
    const current = new Date();
    const currentDate = current.getDate();
    const hr = dt.getHours();
    const min = dt.getMinutes();
    const date = dt.getDate();
    const month = dt.getMonth();

    const defference = currentDate - date;
    if (defference < 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? "PM" : "AM"}`);
      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(`$${date}${getMonthName(month)}`);
    }
  };

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      await onViewUnReadMessage(roomId);
      setUrgent(false);
    }
  };

  useEffect(() => {
    onSeenChat();
  }, [chatRoom]);
  useEffect(() => {
    onSetMessageReceiveDate();
  }, []);

  return { messageSentAt, urgent, onSeenChat };
};

export const useChatWindow = () => {
  const { chats, loading, setChats, chatRoom } = useChatContext();
  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });

  const onSchrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    onSchrollToBottom();
  }, [chats, messageWindowRef]);

  // useEffect(() => {
  //   if (chatRoom) {
  //     pusherClient.subscribe(chatRoom)
  //     pusherClient.bind('realtime-mode', (data: any) => {
  //       setChats((prev) => [...prev, data.chat])
  //     })

  //     return () => {
  //       pusherClient.unbind('realtime-mode')
  //       pusherClient.unsubscribe(chatRoom)
  //     }
  //   }
  // }, [chatRoom])

  const onHandleSentMessage = handleSubmit(async (values) => {
    try {
      reset();
      const message = await onOwnerSendMessage(
        chatRoom!,
        values.content,
        "assistant"
      );
      if (message) {
        setChats((prev) => [...prev, message.message[0]]);

        // await onReltimeChat(
        //   chatRoom!,
        //   message.message[0].message,
        //   message.message[0].id,
        //   "assistant"
        // );
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    messageWindowRef,
    register,
    onHandleSentMessage,
    chats,
    loading,
    chatRoom,
  };
};
