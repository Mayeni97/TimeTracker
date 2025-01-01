import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { TableRowSkeleton } from "@/components/ui/loading-skeleton";

interface TimeEntry {
  date: string;
  clockIn: string;
  clockOut: string;
  duration: string;
}

interface TimeEntryHistoryProps {
  entries?: TimeEntry[];
  dateRange?: { from: Date; to: Date };
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
}

const defaultEntries: TimeEntry[] = [
  {
    date: "2024-01-15",
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    duration: "8h 0m",
  },
  {
    date: "2024-01-14",
    clockIn: "08:30 AM",
    clockOut: "04:30 PM",
    duration: "8h 0m",
  },
  {
    date: "2024-01-13",
    clockIn: "09:15 AM",
    clockOut: "05:15 PM",
    duration: "8h 0m",
  },
];

const TimeEntryHistory: React.FC<TimeEntryHistoryProps> = ({
  entries = defaultEntries,
  dateRange: propDateRange,
  onDateRangeChange,
  onSearch,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [filteredEntries, setFilteredEntries] = useState(entries);

  // Update dateRange if prop changes
  useEffect(() => {
    if (propDateRange) {
      setDateRange(propDateRange);
    }
  }, [propDateRange]);

  // Filter entries based on search term and date range
  useEffect(() => {
    let filtered = [...entries];

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((entry) => {
        const entryDate = parseISO(entry.date);
        return isWithinInterval(entryDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
      });
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.clockIn.toLowerCase().includes(term) ||
          entry.clockOut.toLowerCase().includes(term) ||
          entry.duration.toLowerCase().includes(term) ||
          format(parseISO(entry.date), "MMM dd, yyyy")
            .toLowerCase()
            .includes(term),
      );
    }

    setFilteredEntries(filtered);
  }, [entries, searchTerm, dateRange]);

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <Card className="p-6 bg-white w-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Time Entry History</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Search entries..."
              className="w-[250px]"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              disabled={isLoading}
            />
            <DatePickerWithRange
              date={dateRange}
              onDateChange={handleDateRangeChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
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
                <TableRowSkeleton />
              </>
            ) : filteredEntries.length > 0 ? (
              filteredEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(parseISO(entry.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{entry.clockIn}</TableCell>
                  <TableCell>{entry.clockOut}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-muted-foreground"
                >
                  No entries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TimeEntryHistory;
