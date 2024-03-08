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

function formatSchemaKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

function TableCellContent({ value }: { value: any }) {
  if (typeof value === "string") {
    return (
      <TableCell key={value}>
        {value.length > 30 ? value.slice(0, 30) + "..." : value}
      </TableCell>
    );
  }
  if (typeof value === "boolean") {
    return (
      <TableCell key={value ? "Pending" : "Active"}>
        <Badge variant="outline">{value ? "Pending" : "Active"}</Badge>
      </TableCell>
    );
  }
  return null;
}

export async function DataTable({ data }: { data: any }) {
  const schema = data.length ? Object.keys(data[0]).map(formatSchemaKey) : [];

  return (
    <ScrollArea className="min-w-0 whitespace-nowrap rounded-md border">
      <div className="w-full">
        <Table>
          {data && data.length ? (
            <TableHeader>
              <TableRow>
                {schema.map((item) => (
                  <TableHead key={item}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          ) : null}

          <TableBody>
            {data && data.length ? (
              data.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  {Object.values(item).map((value: any, idx: number) => (
                    <TableCellContent key={idx} value={value} />
                  ))}
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
