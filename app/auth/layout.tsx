import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type AuthProps = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: AuthProps) => {
  const user = await currentUser();
  if (user) return redirect("/");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <Image
            src={"/images/corinna-ai-logo.png"}
            alt="logo"
            sizes="100vw"
            style={{
              width: "30%",
              height: "auto",
            }}
            className=""
            width={0}
            height={0}
          />
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:flex flex-col justify-center h-screen px-4">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered sales assistant, Corinna!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Corinna is capable of capturing lead information without a form...{" "}
          <br />
          something never done before 😉
        </p>
        <Image
          src="/images/app-ui.png"
          alt="Image"
          loading="lazy"
          sizes="30"
          width={0}
          height={0}
          className="w-[1600px] shrink-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
