import Image from "next/image";
import Logo from "/public/DICE.svg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CredentialCard } from "@/components/student/credential-card";
import { getSharedCredentials } from "@/components/utils/get-db-data";

type SharedLink = {
  active: boolean;
  linkEntries: {
    credentialType: string;
    credentialLink: string;
    transactionId: string;
    issuerWallet: string;
    issueDate: string;
    issuer: {
      image: string;
      name: string;
      email: string;
    };
    owner: {
      name: string;
      email: string;
      wallets: [{ walletID: string }];
    };
  }[];
};

export default async function Page({ params }: { params: { linkId: string } }) {
  //@ts-ignore
  const sharedLink: SharedLink = await getSharedCredentials(params.linkId);

  let result = "";

  if (sharedLink === null || sharedLink.active === false) {
    result = "The link you entered is broken or invalid!";
  }
  if (sharedLink.linkEntries.length === 0) {
    result = "No credentials found for this link!";
  }

  return (
    <div>
      <Image className="p-4 dark:invert" alt="Logo" src={Logo} width={100} />
      {result !== "" ? (
        <div>
          <div className="text-center text-ring pt-10 pb-6">{result}</div>
          <div className="flex items-center gap-4 justify-center">
            <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
              Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sharedLink.linkEntries.map((cred, idx) => (
            <CredentialCard
              key={idx}
              imageLink={cred.issuer.image}
              credLink={cred.credentialLink}
              credType={cred.credentialType}
              issuer={cred.issuer.name}
              issuerEmail={cred.issuer.email}
              issuerWalletID={cred.issuerWallet}
              transactionID={cred.transactionId}
              issueDate={cred.issueDate}
              owner={cred.owner.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
