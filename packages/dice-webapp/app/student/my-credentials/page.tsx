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
          creds.map((cred) => {
            return (
              <CredentialCard
                key={cred.credentialLink}
                title={cred.credentialType}
                issueDate={cred.issueDate}
                issuer={cred.issuer.name}
                credLink={cred.credentialLink}
                imageLink={cred.issuer.image}
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
