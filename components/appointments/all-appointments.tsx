"use client";
import { APPOINTMENT_TABLE_HEADER } from "@/constants/menu";
import DataTable from "../table";
import { TableCell, TableRow } from "../ui/table";
import { CardDescription } from "../ui/card";
import { getMonthName } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};
const AllAppointments = ({ bookings }: Props) => {
  const [mouted, setIsMouted] = useState<boolean>(false);
  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!mouted) return null;
  return (
    <DataTable headers={APPOINTMENT_TABLE_HEADER}>
      {bookings ? (
        bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.email}</TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.date.getMonth())} {booking.date.getDate()}{" "}
                {booking.date.getFullYear()}
                <div className="uppercase">{booking.slot}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.createdAt.getMonth())}{" "}
                {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
              </div>
              <div>
                {booking.createdAt.getHours()} {booking.createdAt.getMinutes()}{" "}
                {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {booking.Customer?.Domain?.name}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <CardDescription>No Appointments</CardDescription>
      )}
    </DataTable>
  );
};

export default AllAppointments;
