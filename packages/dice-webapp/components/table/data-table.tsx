import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table";
import getStudentCertificates from "../fetchers/getStudentCertificates";

export function DataTable({ content }: { content: string }) {
  let data: any = [];

  if (content === "student_cert") {
    data = getStudentCertificates();
  }

  let formatHead = (head: string) => {
    let result = head.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0]).map(
            (key: any) =>
              key !== "id" && (
                <TableHead key={key}>{formatHead(key)}</TableHead>
              ),
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            {Object.values(item).map(
              (value: any) =>
                value !== item.id && <TableCell key={value}>{value}</TableCell>,
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
