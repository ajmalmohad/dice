import { IssueCredentialForm } from "@/components/institution/issue-form";
import Navbar from "@/components/navbar/navbar";
import { ConnectWeb3Wallet } from "@/components/web3/connect-web3-wallet";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <ConnectWeb3Wallet className="mb-6" />
      <IssueCredentialForm />
    </div>
  );
}
