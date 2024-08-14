import PortalBanner from "@/components/portal/portal-banner";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PortalLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:h-screen">
      <PortalBanner />
      <div className="container flex justify-center flex-1 h-0 mt-12">
        {children}
      </div>
    </div>
  );
};

export default PortalLayout;
