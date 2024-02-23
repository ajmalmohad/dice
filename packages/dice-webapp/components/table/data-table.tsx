import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export async function DataTable({ data }: { data: any }) {
  let schema = data.length ? Object.keys(data[0]) : [];
  schema = schema.map((item: string) => {
    return item.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  });

  return (
    <ScrollArea className="min-w-0 whitespace-nowrap rounded-md border">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {schema.map((item: any) => (
                <TableHead key={item}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length ? (
              data.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  {Object.values(item).map((value: any) => {
                    if (typeof value === "string") {
                      return <TableCell key={value}>{value}</TableCell>;
                    }
                    if (typeof value === "boolean") {
                      return (
                        <TableCell key={value ? "Pending" : "Active"}>
                          <Badge variant="outline">
                            {value ? "Pending" : "Active"}
                          </Badge>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>You have no records</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
