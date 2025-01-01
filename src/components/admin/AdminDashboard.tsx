import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import TimeEntryHistory from "../timeclock/TimeEntryHistory";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/loading-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    navigate("/signin");
  };

  // Mock data for demonstration
  const users = [
    { id: "all", name: "All Users" },
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold">{users.length - 1}</p>
              )}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Today</CardTitle>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold">2</p>
              )}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Hours Today</CardTitle>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold">16.5h</p>
              )}
            </CardHeader>
          </Card>
        </div>

        <Card className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Time Entry Management</h2>
            <div className="flex gap-4">
              <div className="w-[200px]">
                <Select
                  value={selectedUser}
                  onValueChange={setSelectedUser}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Search entries..."
                className="w-[250px]"
                disabled={isLoading}
              />
            </div>
          </div>
          <TimeEntryHistory isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
