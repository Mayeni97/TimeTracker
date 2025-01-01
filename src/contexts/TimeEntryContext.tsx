import React, { createContext, useContext, useEffect, useState } from "react";
import { formatTime, calculateDuration } from "@/lib/utils/time";

interface TimeEntry {
  id: string;
  userId: string;
  clockIn: string;
  clockOut: string | null;
  duration: string | null;
  date: string;
}

interface TimeEntryContextType {
  entries: TimeEntry[];
  activeEntry: TimeEntry | null;
  isLoading: boolean;
  clockIn: () => void;
  clockOut: () => void;
  todayEntries: TimeEntry[];
  todayHours: number;
  weeklyHours: number;
  monthlyHours: number;
}

const TimeEntryContext = createContext<TimeEntryContextType | undefined>(
  undefined,
);

export const TimeEntryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries");
    const savedActiveEntry = localStorage.getItem("activeEntry");

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedActiveEntry) {
      setActiveEntry(JSON.parse(savedActiveEntry));
    }

    setIsLoading(false);
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem("activeEntry", JSON.stringify(activeEntry));
  }, [activeEntry]);

  const clockIn = () => {
    const now = new Date();
    const newEntry: TimeEntry = {
      id: now.getTime().toString(),
      userId: localStorage.getItem("userRole") || "user",
      clockIn: now.toISOString(),
      clockOut: null,
      duration: null,
      date: now.toISOString().split("T")[0],
    };
    setActiveEntry(newEntry);
  };

  const clockOut = () => {
    if (!activeEntry) return;

    const now = new Date();
    const completedEntry: TimeEntry = {
      ...activeEntry,
      clockOut: now.toISOString(),
      duration: calculateDuration(new Date(activeEntry.clockIn), now),
    };

    setEntries((prev) => [...prev, completedEntry]);
    setActiveEntry(null);
  };

  // Calculate today's entries
  const todayEntries = entries.filter(
    (entry) => entry.date === new Date().toISOString().split("T")[0],
  );

  // Calculate hours
  const calculateHours = (entries: TimeEntry[]): number => {
    return entries.reduce((total, entry) => {
      if (!entry.duration) return total;
      const [hours, minutes] = entry.duration
        .split("h ")
        .map((num) => parseFloat(num));
      return total + hours + minutes / 60;
    }, 0);
  };

  const todayHours = calculateHours(todayEntries);

  const weeklyHours = calculateHours(
    entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }),
  );

  const monthlyHours = calculateHours(
    entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return entryDate >= monthAgo;
    }),
  );

  return (
    <TimeEntryContext.Provider
      value={{
        entries,
        activeEntry,
        isLoading,
        clockIn,
        clockOut,
        todayEntries,
        todayHours,
        weeklyHours,
        monthlyHours,
      }}
    >
      {children}
    </TimeEntryContext.Provider>
  );
};

export const useTimeEntry = () => {
  const context = useContext(TimeEntryContext);
  if (context === undefined) {
    throw new Error("useTimeEntry must be used within a TimeEntryProvider");
  }
  return context;
};
