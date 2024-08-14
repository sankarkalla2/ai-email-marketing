import { onBookNewAppointemnt, saveUserResponses } from "@/actions/appointment";
import { toast } from "@/components/ui/use-toast";
import { KeySquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const usePortal = (
  customerId: string,
  domainId: string,
  email: string
) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  setValue("date", date);

  const onNext = () => setStep((prev) => prev + 1);
  const onPrev = () => setStep((prev) => prev - 1);

  const onBookAppointment = handleSubmit(async (values) => {
    console.log("hello world");
    try {
      setLoading(true);

      const questions = Object.keys(values)
        .filter((key) => key.startsWith("question"))
        .reduce((obj: any, key) => {
          obj[(key.split("question-")[1] = values[key])];
          return obj;
        }, {});

      console.log(questions);

      const saveAnswers = await saveUserResponses(questions, customerId);
      if (saveAnswers) {
        console.log("hello");
        const booked = await onBookNewAppointemnt(
          domainId,
          customerId,
          values.slot,
          email,
          values.date
        );

        if (booked && booked.status == 200) {
          setLoading(false);
          toast({
            title: "Success",
            description: booked.message,
          });
          setStep(3);
          setLoading(false);
        }
      }
    } catch (error) {}
  });

  const onSelectedTimeSlot = (slot: string) => setSelectedSlot(slot);

  return {
    register,
    step,
    onNext,
    onPrev,
    errors,
    loading,
    onBookAppointment,
    date,
    setDate,
    onSelectedTimeSlot,
    selectedSlot,
  };
};
