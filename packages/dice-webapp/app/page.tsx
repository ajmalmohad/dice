import { Button } from "@nextui-org/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { SignOutButton } from "@/components/auth/google-auth"

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Button>Click me</Button>
      {
        session ?  <SignOutButton /> : <p>Please Log In</p>
      }
    </div>
  );
}
