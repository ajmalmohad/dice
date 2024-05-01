import Navbar from "@/components/navbar/navbar";
import { CredentialCard } from "@/components/student/credential-card";
import { getStudentActiveCredentails } from "@/components/utils/get-db-data";

export default async function Page() {
  const creds = await getStudentActiveCredentails();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        {creds.length > 0 ? (
          creds.map((cred, idx) => {
            return (
              <CredentialCard
                key={idx}
                credType={cred.credentialType}
                credLink={cred.credentialLink}
                imageLink={cred.issuer.image}
                issueDate={cred.issueDate}
                issuer={cred.issuer.name}
                issuerEmail={cred.issuer.email}
                issuerWalletID={cred.issuerWallet}
                transactionID={cred.transactionId}
                owner={cred.owner.name}
              />
            );
          })
        ) : (
          <div className="text-center text-ring">No credentials found</div>
        )}
      </div>
    </div>
  );
}
