import { differenceInMinutes, format } from "date-fns";

export const formatTime = (date: Date): string => {
  return format(date, "hh:mm a");
};

export const calculateDuration = (startTime: Date, endTime: Date): string => {
  const minutes = differenceInMinutes(endTime, startTime);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
