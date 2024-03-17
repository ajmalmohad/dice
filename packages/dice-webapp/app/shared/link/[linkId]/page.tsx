import Image from "next/image";
import Logo from "/public/DICE.svg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CredentialCard } from "@/components/student/credential-card";
import { getSharedCredentials } from "@/components/utils/get-db-data";

export default async function Page({ params }: { params: { linkId: string } }) {
  const creds = await getSharedCredentials(params.linkId);

  return (
    <div>
      <Image className="p-4 dark:invert" alt="Logo" src={Logo} width={100} />
      {typeof creds === "string" ? (
        <div>
          <div className="text-center text-ring pt-10 pb-6">{creds}</div>
          <div className="flex items-center gap-4 justify-center">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {creds.map((cred, idx) => (
            <CredentialCard
              key={idx}
              title={cred.credentialType}
              issueDate={cred.issueDate}
              issuer={cred.issuer.name}
              credLink={cred.credentialLink}
              imageLink={cred.issuer.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
