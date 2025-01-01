import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Clock, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/loading-skeleton";

interface SummaryCardProps {
  title: string;
  hours: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

const SummaryCard = ({
  title = "Summary",
  hours = 0,
  icon,
  isLoading = false,
}: SummaryCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-2xl font-bold">{hours.toFixed(1)}h</div>
        )}
      </CardContent>
    </Card>
  );
};

interface SummaryDashboardProps {
  dailyHours?: number;
  weeklyHours?: number;
  monthlyHours?: number;
  isLoading?: boolean;
}

const SummaryDashboard = ({
  dailyHours = 8.5,
  weeklyHours = 42.5,
  monthlyHours = 168.0,
  isLoading = false,
}: SummaryDashboardProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Today's Hours"
          hours={dailyHours}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />
        <SummaryCard
          title="This Week's Hours"
          hours={weeklyHours}
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />
        <SummaryCard
          title="This Month's Hours"
          hours={monthlyHours}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SummaryDashboard;
