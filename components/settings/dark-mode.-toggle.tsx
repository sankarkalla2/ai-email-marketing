"use client";

import React from "react";
import HeadingLabel from "../heading";
import { cn } from "@/lib/utils";
import { SystemMode } from "../thmes-placeholder/sysem";
import { LightMode } from "../thmes-placeholder/lightmode";
import { DarkMode } from "../thmes-placeholder/darkmode";
import { useToggleMode } from "@/hooks/settings/use-settings";

type Props = {};

const DarkModetoggle = (props: Props) => {
  const { setTheme, theme } = useToggleMode();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-10">
      <div className="lg:col-span-1">
        <HeadingLabel
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "system" && "border-orange"
          )}
          onClick={() => setTheme("system")}
        >
          <SystemMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "light" && "border-orange"
          )}
          onClick={() => setTheme("light")}
        >
          <LightMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "dark" && "border-orange"
          )}
          onClick={() => setTheme("dark")}
        >
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default DarkModetoggle;
