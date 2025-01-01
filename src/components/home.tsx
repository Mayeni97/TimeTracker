import React from "react";
import { useNavigate } from "react-router-dom";
import ClockButton from "./timeclock/ClockButton";
import DailyTimecard from "./timeclock/DailyTimecard";
import SummaryDashboard from "./timeclock/SummaryDashboard";
import TimeEntryHistory from "./timeclock/TimeEntryHistory";
import { Button } from "@/components/ui/button";
import { useTimeEntry } from "@/contexts/TimeEntryContext";

const Home = () => {
  const navigate = useNavigate();
  const {
    activeEntry,
    clockIn,
    clockOut,
    isLoading,
    todayEntries,
    todayHours,
    weeklyHours,
    monthlyHours,
  } = useTimeEntry();

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Time Clock</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <ClockButton
              isClockingIn={!!activeEntry}
              onToggle={activeEntry ? clockOut : clockIn}
            />
          </div>

          <div>
            <DailyTimecard
              entries={todayEntries}
              totalHours={`${todayHours.toFixed(1)}h`}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="space-y-8">
          <SummaryDashboard
            dailyHours={todayHours}
            weeklyHours={weeklyHours}
            monthlyHours={monthlyHours}
            isLoading={isLoading}
          />

          <TimeEntryHistory isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
