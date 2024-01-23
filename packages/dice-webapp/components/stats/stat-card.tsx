import { Card } from "../ui/card";

import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
};

export const StatCard = ({ title, value, icon, className }: StatCardProps) => {
  return (
    <Card className={cn("flex flex-col min-w-[200px]", className)}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-2xl">{icon}</div>
    </Card>
  );
};
