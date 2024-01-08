import { DynamicTable } from "@/components/table/table";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Page() {
  return (
    <div>
      <ThemeSwitcher />
      <DynamicTable title="hello" mode={'RECENT_CERTS'}/>
    </div>
  );
}