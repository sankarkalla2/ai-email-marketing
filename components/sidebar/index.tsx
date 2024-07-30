"use client";

import useSidebar from "@/context/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import MaxMenu from "./max-menu";
import MinMenu from "./min-menu";

type Props = {
  domains: { id: string; name: string; icon: string }[] | null | undefined;
};

const Sidebar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSidebar();
  return (
    <div
      className={cn(
        " bg-slate-50 dark:bg-neutral-950 z-50 h-screen w-[60px] fill-mode-forwards fixed md:relative",
        expand === undefined && "",
        expand === true
          ? "animate-open-sidebar w-[270px]"
          : expand === false && "animate-close-sidebar"
      )}
    >
      {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default Sidebar;
