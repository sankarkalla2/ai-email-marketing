"use server";

import db from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { register } from "module";

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return { error: "User not authenticated" };

    const plan = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) return { plan: plan.subscription?.plan };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong! Please try again" };
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domain = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            chatBot: true,
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                id: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return { ...domain };
  } catch (error) {
    console.log(error);
  }
};

export const onDomainIntegration = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  console.log(domain, icon);
  console.log("called");

  try {
    const subscription = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    console.log(subscription);

    const domainExists = await db.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });

    console.log(domainExists);
    console.log(
      subscription?.subscription?.plan + " " + subscription?._count.domains
    );
    if (!domainExists) {
      if (
        (subscription?.subscription?.plan === "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan === "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan === "ULTIMATE" &&
          subscription._count.domains < 50)
      ) {
        const newDomain = await db.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have a question? Text us here",
                  },
                },
              },
            },
          },
        });

        if (newDomain)
          return { status: 200, message: "Domain added Successfully" };
      }
    }

    return {
      status: 400,
      message: "You reached the maximum number of domains, upgrade you plan",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const userDomain = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: {
              contains: domain,
            },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
              },
            },
          },
        },
      },
    });

    if (userDomain) return userDomain;
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateDomain = async (id: string, domain: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domainExists = await db.domain.findFirst({
      where: {
        name: {
          contains: domain,
        },
      },
    });

    if (!domainExists) {
      const updatedDomain = await db.domain.update({
        where: {
          id,
        },
        data: {
          name: domain,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (updatedDomain) {
        return {
          status: 200,
          message: "Domain Updated",
          name: updatedDomain.name,
        };
      }

      return { status: 400, message: "OOps something went wrong" };
    }

    return { status: 400, message: "Domain with this name already exists" };
  } catch (error) {
    console.log(error);
  }
};

export const onChatBotImageUpdate = async (id: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domain = await db.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            icon,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (domain) {
      return { status: 200, message: "Your ChatBot Icon updated successfully" };
    }

    return {
      status: 400,
      message: "OOps something went wrong! Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateLongMessage = async (
  id: string,
  welcomeMessage: string
) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const message = await db.domain.update({
      where: {
        id,
      },
      data: {
        chatBot: {
          update: {
            welcomeMessage,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (message) {
      return {
        status: 200,
        message: "Your Welcome message updated successfully",
      };
    }

    return {
      status: 400,
      message: "OOps something went wrong! Please try again",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteUserDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const isValidUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });
    const domainExists = await db.domain.findUnique({
      where: {
        id,
      },
    });

    if (domainExists && isValidUser) {
      const domain = await db.domain.delete({
        where: {
          id,
          userId: isValidUser.id,
        },
        select: {
          name: true,
        },
      });

      if (domain) {
        return { status: 200, message: "Domain deleted successfully" };
      }

      return {
        status: 400,
        message: "OOps something went wront! please try again",
      };
    }

    return { status: 400, message: "Domain not existed already" };
  } catch (error) {
    console.log(error);
  }
};

export const onCreateHelpDeskQuestions = async (
  id: string,
  question: string,
  answer: string
) => {
  try {
    const helpDeskQuesion = await db.domain.update({
      where: {
        id,
      },
      data: {
        helpDesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpDesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });

    if (helpDeskQuesion) {
      return {
        status: 200,
        message: "New help question added",
        questions: helpDeskQuesion.helpDesk,
      };
    }

    return { status: 400, message: "OOps! something went wrong" };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllHelpDeskQuestions = async (id: string) => {
  try {
    const domainExists = await db.domain.findUnique({
      where: {
        id,
      },
    });

    if (domainExists) {
      const questions = await db.domain.findUnique({
        where: {
          id: domainExists.id,
        },
        select: {
          helpDesk: {
            select: {
              id: true,
              question: true,
              answer: true,
            },
          },
        },
      });

      if (questions) {
        return {
          status: 200,
          message: "Fetched successfully",
          questions: questions.helpDesk,
        };
      }

      return { status: 200, message: "not found" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateFilteredQuestion = async (
  id: string,
  question: string,
  answered?: string
) => {
  try {
    const helpDeskQuesion = await db.domain.update({
      where: {
        id,
      },
      data: {
        filterQuestions: {
          create: {
            question,
            answered,
          },
        },
      },
      include: {
        filterQuestions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });

    if (helpDeskQuesion) {
      return {
        status: 200,
        message: "New help question added",
        questions: helpDeskQuesion.filterQuestions,
      };
    }

    return { status: 400, message: "OOps! something went wrong" };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllFilteredQuestions = async (id: string) => {
  try {
    const domainExists = await db.domain.findUnique({
      where: {
        id,
      },
    });

    if (domainExists) {
      const questions = await db.domain.findUnique({
        where: {
          id: domainExists.id,
        },
        select: {
          filterQuestions: {
            select: {
              id: true,
              question: true,
              answered: true,
            },
          },
        },
      });

      if (questions) {
        return {
          status: 200,
          message: "Fetched successfully",
          questions: questions.filterQuestions,
        };
      }

      return { status: 200, message: "not found" };
    }
  } catch (error) {
    console.log(error);
  }
};
