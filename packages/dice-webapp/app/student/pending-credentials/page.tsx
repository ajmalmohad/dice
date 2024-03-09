import Navbar from "@/components/navbar/navbar";
import { PendingCredentialCard } from "@/components/student/pending-credential";
import { getStudentPendingCredentails } from "@/components/utils/get-db-data";

export default async function Page() {
  const creds = await getStudentPendingCredentails();

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        {creds.length > 0 ? (
          creds.map((cred, idx) => {
            return (
              <PendingCredentialCard
                key={idx}
                title={cred.credentialType}
                imageLink={cred.issuer.image}
                issuer={cred.issuer.name}
                issueDate={cred.issueDate}
                credLink={cred.credentialLink}
              />
            );
          })
        ) : (
          <div className="text-center text-ring">No pending credentials</div>
        )}
      </div>
    </div>
  );
}
