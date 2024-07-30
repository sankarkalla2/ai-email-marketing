import React from "react";

type SectionProps = {
  label: string;
  message: string;
};

const HeadingLabel = ({ label, message }: SectionProps) => {
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default HeadingLabel;
