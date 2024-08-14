import { onGetAllDomainBookingsForCurrentUser } from "@/actions/appointment";
import AllAppointments from "@/components/appointments/all-appointments";
import HeadingLabel from "@/components/heading";
import InfoBar from "@/components/infotbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";

const Appointment = async () => {
  const user = await currentUser();
  if (!user) return null;
  const domainBookings = await onGetAllDomainBookingsForCurrentUser(user?.id);

  if (!domainBookings)
    return (
      <CardDescription className="w-full flex justify-center">
        No Appotments
      </CardDescription>
    );
  const today = new Date();

  const bookingsExistToday = domainBookings.bookings.filter(
    (booking) => booking.date.getDate() == today.getDate()
  );

  return (
    <div>
      <InfoBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AllAppointments bookings={domainBookings?.bookings} />
        </div>
        <div className="col-span-1">
          <HeadingLabel
            label="Bookings For Today"
            message="All your bookings for today are mentioned below."
          />
          {bookingsExistToday.length ? (
            bookingsExistToday.map((booking) => (
              <Card
                key={booking.id}
                className="rounded-xl overflow-hidden mt-4"
              >
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-orange-200 py-10 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-3">
                      <p className="text-sm">
                        created
                        <br />
                        {booking.createdAt.getHours()}{" "}
                        {booking.createdAt.getMinutes()}{" "}
                        {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
                      </p>
                      <p className="text-sm">
                        Domain
                        <br />
                        {booking.Customer?.Domain?.name}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2">
                      <Avatar>
                        <AvatarFallback>{booking.email[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <p>No Appointments For Today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
