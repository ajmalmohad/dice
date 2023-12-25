import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Button>Click me</Button>
      {
        session ?  <ThemeSwitcher /> : <p>Please Log In</p>
      }
    </div>
  );
}
