"use client";
import { useAuthContextHook } from "@/context/use-auth-context";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const HighlightSteps = (props: Props) => {
  const { currentStep } = useAuthContextHook();
  return (
    <div className="grid grid-cols-3 gap-3">
      <div
        className={cn(
          "rounded-full h-[7px] col-span-1",
          currentStep == 1 ? "bg-amber-500" : "bg-muted-foreground"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-[7px] col-span-1",
          currentStep == 2 ? "bg-amber-500" : "bg-muted-foreground"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-[7px] col-span-1",
          currentStep == 3 ? "bg-amber-500" : "bg-muted-foreground"
        )}
      ></div>
    </div>
  );
};

export default HighlightSteps;
