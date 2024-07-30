import { SIDE_BAR_MENU } from "@/constants/menu";
import { MenuLogo } from "@/icons/menu-logo";
import React from "react";
import MenuItem from "./menu-item";
import DomainMenu from "./domain-menu";
import { LogOut, MonitorSmartphone, Tv } from "lucide-react";

type Props = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

const MinMenu = ({ onSignOut, current, domains, onShrink }: Props) => {
  return (
    <div className="p-3 flex flex-col items-center h-full bg-slate-50 dark:bg-black">
      <span className="opacity-300 delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>
      <div className="opacity-300 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domain={domains} />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  );
};

export default MinMenu;
