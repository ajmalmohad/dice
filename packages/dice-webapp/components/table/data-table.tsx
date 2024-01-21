import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/table"
import getStudentCertificates from "../fetchers/getStudentCertificates"

export function DataTable({ caption, content }: { caption: string, content: string }) {
  let data: any = []

  if (content === 'student_cert') {
    data = getStudentCertificates();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead>Issuer</TableHead>
          <TableHead>IssueDate</TableHead>
          <TableHead className="text-right">Validity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.issuer}</TableCell>
            <TableCell>{item.issueDate}</TableCell>
            <TableCell className="text-right">{item.expiryDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
