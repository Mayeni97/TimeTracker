import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Play, Square } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ClockButtonProps {
  isClockingIn?: boolean;
  onToggle?: () => void;
  currentTime?: string;
}

const ClockButton = ({
  isClockingIn = false,
  onToggle = () => {},
  currentTime = new Date().toLocaleTimeString(),
}: ClockButtonProps) => {
  const [time, setTime] = useState(currentTime);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-8 bg-white flex flex-col items-center justify-center space-y-4 w-[300px]">
      <Button
        variant={isClockingIn ? "destructive" : "default"}
        size="lg"
        className="w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
        onClick={onToggle}
      >
        <div className="flex flex-col items-center space-y-2">
          {isClockingIn ? (
            <Square className="w-12 h-12" />
          ) : (
            <Play className="w-12 h-12" />
          )}
          <span className="text-lg font-semibold">
            {isClockingIn ? "Clock Out" : "Clock In"}
          </span>
        </div>
      </Button>

      <div className="flex items-center space-x-2 text-lg font-medium text-gray-600">
        <Clock className="w-5 h-5" />
        <span>{time}</span>
      </div>
    </Card>
  );
};

export default ClockButton;
