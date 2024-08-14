import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps = {
  headers: string[];
  children: React.ReactNode;
};

const DataTable = ({ headers, children }: DataTableProps) => {
  return (
    <Table className="rounded-xl overflow-hidden">
      <TableHeader>
        <TableRow className="">
          {headers.map((header, key) => (
            <TableHead
          
              key={key}
              className={cn(
                key == headers.length - 1 && "text-right",
                "text-black bg-amber-300"
              )}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default DataTable;
