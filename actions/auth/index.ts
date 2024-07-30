"use server";

import db from "@/lib/db";
import { clerkClient, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { onGetAllAccountDomains } from "../settings";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await db.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (registered) return { status: 200, user: registered };
  } catch (error) {
    return { status: 500 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();

  try {
    const authenticated = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (authenticated) {
      const domains = await onGetAllAccountDomains();

      return { status: 200, user: authenticated, domain: domains?.domains };
    }
  } catch (error) {}
};

export const updatePassword = async (password: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const upldated = await clerkClient.users.updateUser(user.id, {
      password,
    });

    if (upldated) return { status: 200, message: "Password genereted" };
  } catch (error: any) {
    console.log(error.errors[0].longMessage);

    return { status: 400, message: error.errors[0].longMessage };
  }
};
