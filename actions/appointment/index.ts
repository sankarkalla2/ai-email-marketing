"use server";

import db from "@/lib/db";

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await db.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });
    console.log(customerQuestions);

    if (customerQuestions) return customerQuestions;
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllDomainBookings = async (domainId: string) => {
  try {
    const bookings = await db.bookings.findMany({
      where: {
        domainId,
      },
      select: {
        slot: true,
        date: true,
      },
    });

    if (bookings) return bookings;
  } catch (error) {
    console.log(error);
  }
};

export const onBookNewAppointemnt = async (
  domainId: string,
  customerId: string,
  slot: string,
  email: string,
  date: string
) => {
  try {
    const booking = await db.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email,
          },
        },
      },
    });

    if (booking) return { status: 200, message: "New booking is created" };
  } catch (error) {
    console.log(error);
  }
};

export const saveUserResponses = async (
  questions: [question: string],
  customerId: string
) => {
  try {
    for (const question in questions) {
      await db.customer.update({
        where: { id: customerId },
        data: {
          questions: {
            update: {
              where: {
                id: question,
              },
              data: {
                answered: questions[question],
              },
            },
          },
        },
      });
    }

    return { status: 200, message: "updated Responses" };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllDomainBookingsForCurrentUser = async (id: string) => {
  try {
    const bookings = await db.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId: id,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (bookings) return { bookings };
  } catch (error) {
    console.log(error);
  }
};
