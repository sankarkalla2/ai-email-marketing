import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  classname?: string;
  noPadding?: boolean;
};

export const Loader = ({
  loading,
  children,
  classname,
  noPadding,
}: LoaderProps) => {
  return loading ? (
    <div className={cn(classname || "w-full py-5 flex  justify-center")}>
      <Spinner />
    </div>
  ) : (
    children
  );
};
