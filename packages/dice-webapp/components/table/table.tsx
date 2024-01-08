"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { RecentCertSchema, fetchCertificates } from "./table-data";

export type TableDef = {
    title: string;
    mode: string;
};

export function DynamicTable({ title, mode }: TableDef) {
  let columns: string[] = [];
  let invoker: () => Promise<string[][]> = () => Promise.resolve([]);
  const [data, setData] = useState<string[][]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  switch(mode) {
  case 'RECENT_CERTS':
    columns = RecentCertSchema;
    invoker = fetchCertificates;
    break;
  default:
    break;
  }

  useEffect(() => {
    invoker().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  const renderCell = (cell: string, column: string) => {
    switch (column) {
    case "Status":
      return (
        <Chip
          className="capitalize"
          variant="flat"
          color={
            cell === "Active" ? "success" : "warning"
          }
        >{cell}
        </Chip>
      );
    default:
      return cell;
    }
  }

  return (
    <div>
      <Table aria-label="Example static collection table" classNames={{
        table: "min-h-[300px]",
      }}>
        <TableHeader>
          {
            columns.map((column, i) => (
              <TableColumn key={i}>{column}</TableColumn>
            ))
          }
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
          {
            data.map((row, i) => (
              <TableRow key={i}>
                {
                  row.map((cell, idx) => (
                    <TableCell key={idx}>{
                      renderCell(cell, columns[idx])
                    }</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}