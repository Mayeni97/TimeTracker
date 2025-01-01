import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableRowSkeleton } from "@/components/ui/loading-skeleton";

interface TimeEntry {
  id: string;
  clockIn: string;
  clockOut: string | null;
  duration: string | null;
}

interface DailyTimecardProps {
  entries?: TimeEntry[];
  totalHours?: string;
  isLoading?: boolean;
}

const DailyTimecard = ({
  entries = [
    {
      id: "1",
      clockIn: "09:00 AM",
      clockOut: "12:30 PM",
      duration: "3h 30m",
    },
    {
      id: "2",
      clockIn: "1:30 PM",
      clockOut: null,
      duration: null,
    },
  ],
  totalHours = "3h 30m",
  isLoading = false,
}: DailyTimecardProps) => {
  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Today's Timecard</CardTitle>
        <div className="text-sm text-muted-foreground">
          Total Hours:{" "}
          <span className="font-bold text-primary">
            {isLoading ? "--:--" : totalHours}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.clockIn}</TableCell>
                    <TableCell>{entry.clockOut || "Active"}</TableCell>
                    <TableCell>{entry.duration || "---"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DailyTimecard;
