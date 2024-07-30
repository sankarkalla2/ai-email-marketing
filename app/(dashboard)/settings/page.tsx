import InfoBar from "@/components/infotbar";
import BillingSettings from "@/components/settings/billing-settings";
import ChangePassword from "@/components/settings/change-password";
import DarkModeToggle from "@/components/settings/dark-mode.-toggle";
import React from "react";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <div>
      <InfoBar />
      <div className=" flex-1 w-full h-0 flex-col gap-10">
        <BillingSettings />
        <DarkModeToggle />
        <ChangePassword />
      </div>
    </div>
  );
};

export default SettingsPage;
