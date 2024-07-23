import { Headphones, Star, Trash } from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BreadCrumb from "./breadcrumb";

const InfoBar = () => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-8">
      <BreadCrumb />
      <div className="flex items-center gap-3">
        <div className="">
          <Card className="rounded-xl flex gap-3 py-3 px-4">
            <Trash />
            <Star />
          </Card>
        </div>
        <Avatar className="bg-amber-500 text-white">
          <AvatarFallback className="bg-amber-500">
            <Headphones className=""/>
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="http://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default InfoBar;
