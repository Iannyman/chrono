"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  Users,
  FolderKanban,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

interface EmployeeSession {
  person_id: number;
  person_last_name: string;
  person_first_name: string;
  line_id: number;
  line_name: string;
  log_id: number;
  login_timestamp: string;
  logout_timestamp: string | null;
  shift_name: string;
  session_minutes: number;
}

interface EmployeeReportDay {
  reporting_day: string;
  sessions: EmployeeSession[];
}

interface EmployeeApiResponse {
  success: number;
  data: EmployeeReportDay[];
}

interface RecentTimeEntry extends EmployeeSession {
  reporting_day: string;
}

const API_URL = "/api/sessions/detailed";


const stats = [
  { title: "Total Hours This Week", value: "384h", change: "+12%", trend: "up" as const, icon: Clock },
  { title: "Active Employees", value: "48", change: "+3", trend: "up" as const, icon: Users },
  { title: "Active Projects", value: "12", change: "-1", trend: "down" as const, icon: FolderKanban },
  { title: "Avg. Hours / Employee", value: "8.0h", change: "+0.5h", trend: "up" as const, icon: TrendingUp },
];

const projectBreakdown = [
  { name: "Assembly Line A", hours: 120, employees: 15, color: "bg-[#4682B4]" },
  { name: "Assembly Line B", hours: 96, employees: 12, color: "bg-[#5B9BD5]" },
  { name: "Assembly Line C", hours: 72, employees: 8, color: "bg-[#6BAED6]" },
  { name: "Assembly Line D", hours: 56, employees: 7, color: "bg-[#7EC8E3]" },
  { name: "Assembly Line E", hours: 40, employees: 6, color: "bg-[#9DC8E3]" },
];


export default function HomePage() {
  const [recentTimeEntries, setRecentTimeEntries] = useState<
    RecentTimeEntry[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEntries = async () => {
      try {
        setIsLoading(true);
        setError("");

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 60);

        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          return `${year}-${month}-${day}`;
        };

        const apiResponse = await fetch(API_URL, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: formatDate(yesterday),
            to: formatDate(today),
          }),
        });

        if (!apiResponse.ok) {
          throw new Error("Failed to fetch employee entries");
        }

        console.log("API response status:", apiResponse.status);
        const response: EmployeeApiResponse = await apiResponse.json();

        const entries: RecentTimeEntry[] = response.data
          .flatMap((day) =>
            day.sessions.map((session) => ({
              reporting_day: day.reporting_day,
              ...session,
            }))
          )
          .sort(
            (a, b) =>
              new Date(b.login_timestamp).getTime() -
              new Date(a.login_timestamp).getTime()
          )
          .slice(0, 10);

        setRecentTimeEntries(entries);
      } catch (error) {
        console.error(error);
        setError("Could not load recent time entries.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentEntries();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Header */}
      <div className="mx-8 mt-8 mb-2">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of working hours, projects, and team activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{stat.title}</span>
                <Icon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span
                  className={`flex items-center text-xs font-medium ${stat.trend === "up"
                    ? "text-emerald-400"
                    : "text-red-400"
                    }`}
                >
                  {/* {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {stat.change} */}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-8 my-4 flex-1">
        {/* Recent Time Entries */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Time Entries
            </h2>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Today
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="text-left py-3 font-medium">Employee</th>
                  <th className="text-left py-3 font-medium">Project</th>
                  <th className="text-left py-3 font-medium">Date</th>
                  <th className="text-left py-3 font-medium">Check-in</th>
                  {/* <th className="text-right py-3 font-medium">Hours</th>
                  <th className="text-right py-3 font-medium">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      Loading recent entries...
                    </td>
                  </tr>
                )}

                {!isLoading && error && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-red-400">
                      {error}
                    </td>
                  </tr>
                )}

                {!isLoading && !error && recentTimeEntries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      No recent entries found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  !error &&
                  recentTimeEntries.map((entry) => (
                    <tr
                      key={entry.log_id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-3 text-white">
                        {entry.person_first_name} {entry.person_last_name}
                      </td>

                      <td className="py-3 text-gray-300">
                        {entry.line_name}
                      </td>

                      <td className="py-3 text-gray-400">
                        {new Date(entry.login_timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-3 text-gray-400">
                        {new Date(entry.login_timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Hours by Project
          </h2>

          <div className="flex flex-col gap-4">
            {projectBreakdown.map((project) => (
              <div key={project.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    {project.name}
                  </span>
                  <span className="text-sm text-white font-medium">
                    {project.hours}h
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${project.color} h-2 rounded-full transition-all`}
                    style={{
                      width: `${(project.hours / 120) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {project.employees} employees
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total logged</span>
              <span className="text-white font-semibold">384h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
