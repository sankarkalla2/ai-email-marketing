import { useDomain } from "@/hooks/sidebar/use-domain";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import AppDrawer from "../drawer";
import { Loader } from "../loader";
import FormGenerator from "../forms/form-generator";
import UploadButton from "../upload-button";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  min?: boolean;
  domain:
    | { id: string; name: string; icon: string | null }[]
    | null
    | undefined;
};

const DomainMenu = ({ min, domain }: Props) => {
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex items-center w-full justify-between">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}

        <AppDrawer
          description="add in your domain address to integrate you chatbot"
          title="Add your bussiness domain"
          onOpen={
            <div className="cursor-pointer text-muted-foreground rounded-full border-2">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="mydomain.com"
                type="text"
              />

              <UploadButton
                register={register}
                label="Upload Icon"
                errors={errors}
              />
              <Button className="w-full" type="submit">
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>

      <div
        className={cn(
          "w-full max-h-[200px] flex flex-col justify-center items-start gap-3",
          min && "items-center pt-2 overflow-y-auto"
        )}
      >
        {domain?.map((dom) => (
          <Link
            href={`/settings/${dom.name.split(".")[0]}`}
            className="flex gap-x-2 items-center"
            key={dom.id}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={`https://ucarecdn.com/${dom.icon}/`}
                    alt="icon"
                    height={20}
                    width={20}
                    className=""
                  />
                </TooltipTrigger>
                {min && (
                  <TooltipContent side="right">
                    <p className="underline">{dom.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            {!min && <p>{dom.name}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DomainMenu;
