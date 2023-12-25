import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth")

  if (session.user.role === "USER") {
    redirect("/student")
  }else if (session.user.role === "INSTITUTION") {
    redirect("/institution")
  }else if(session.user.role === "ADMIN") {
    redirect("/admin")  
  } 

  return (
    <div>
      You currently have no role assigned. Please contact your administrator.
    </div>
  );
}
