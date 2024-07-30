import OTPInput from "@/components/otp/otp";
import React from "react";

type Props = {
  onOTP: string;
  setOnOTP: React.Dispatch<React.SetStateAction<string>>;
};

const OTPForm = ({ onOTP, setOnOTP }: Props) => {
  return (
    <>
      <h2 className="md:text-sm text-muted-foreground">Enter Otp</h2>
      <p>Enter the one time password that was sent to your email</p>
      <div>
        <OTPInput otp={onOTP} setOtp={setOnOTP} />
      </div>
    </>
  );
};

export default OTPForm;
