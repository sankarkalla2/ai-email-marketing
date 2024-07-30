"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  value: string;
  title: string;
  description: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};
const UserTypeCard = ({
  value,
  title,
  register,
  description,
  userType,
  setUserType,
}: Props) => {
  return (
    <Label htmlFor={value} className="">
      <Card
        className={cn(
          "w-full cursor-pointer",
          userType === value && "border-amber-500"
        )}
      >
        <CardContent className={cn("flex justify-between p-2")}>
          <div className="flex gap-2 items-center">
            <Card
              className={cn(
                "p-2 flex justify-center",
                userType === value && "border-amber-500"
              )}
            >
              <User
                size={25}
                className={cn(userType === value && "text-amber-500")}
              />
            </Card>
            <div>
              <CardDescription
                className={cn(
                  userType === value ? "text-amber-500" : "text-gray-400"
                )}
              >
                {title}
              </CardDescription>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                userType === value ? "bg-orange-500" : "bg-muted-foreground"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => setUserType(event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
