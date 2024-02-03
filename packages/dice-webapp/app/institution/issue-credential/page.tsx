import { IssueCredentialForm } from "@/components/institution/issue-form";
import Navbar from "@/components/navbar/navbar";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <IssueCredentialForm />
    </div>
  );
}
