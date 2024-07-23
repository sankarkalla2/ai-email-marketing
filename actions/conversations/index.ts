"use server";

import db from "@/lib/db";

export const onToggleRealTime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await db.chatRoom.update({
      where: {
        id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? "Realtime mode enabled"
          : "Realtime mode is disabled",
        chatRoom,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetConversationMode = async (id: string) => {
  try {
    const chatRoom = await db.chatRoom.findUnique({
      where: {
        id,
      },
      select: {
        live: true,
      },
    });

    if(chatRoom) return { ...chatRoom}
  } catch (error) {
    console.log(error);
  }
};
