import { Card, CardHeader, CardContent } from "../ui/card";
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
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-base font-medium">{title}</div>
          <div className="text-lg text-ring">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-medium">{value}</div>
      </CardContent>
    </Card>
  );
};
