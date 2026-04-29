"use client";

import {
  Clock,
  Users,
  FolderKanban,
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Hours This Week",
    value: "384h",
    change: "+12%",
    trend: "up" as const,
    icon: Clock,
  },
  {
    title: "Active Employees",
    value: "48",
    change: "+3",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Active Projects",
    value: "12",
    change: "-1",
    trend: "down" as const,
    icon: FolderKanban,
  },
  {
    title: "Avg. Hours / Employee",
    value: "8.0h",
    change: "+0.5h",
    trend: "up" as const,
    icon: TrendingUp,
  },
];

const recentEntries = [
  {
    employee: "Maria Santos",
    project: "Assembly Line A",
    date: "Apr 28, 2026",
    hours: 8.5,
    status: "Approved",
  },
  {
    employee: "John Reyes",
    project: "Quality Control",
    date: "Apr 28, 2026",
    hours: 7.0,
    status: "Pending",
  },
  {
    employee: "Ana Cruz",
    project: "Packaging Dept.",
    date: "Apr 27, 2026",
    hours: 9.0,
    status: "Approved",
  },
  {
    employee: "Carlos Mendez",
    project: "Assembly Line B",
    date: "Apr 27, 2026",
    hours: 8.0,
    status: "Approved",
  },
  {
    employee: "Lisa Tan",
    project: "Maintenance",
    date: "Apr 27, 2026",
    hours: 6.5,
    status: "Rejected",
  },
];

const projectBreakdown = [
  { name: "Assembly Line A", hours: 120, employees: 15, color: "bg-[#4682B4]" },
  { name: "Assembly Line B", hours: 96, employees: 12, color: "bg-[#5B9BD5]" },
  { name: "Quality Control", hours: 72, employees: 8, color: "bg-[#6BAED6]" },
  { name: "Packaging Dept.", hours: 56, employees: 7, color: "bg-[#7EC8E3]" },
  { name: "Maintenance", hours: 40, employees: 6, color: "bg-[#9DC8E3]" },
];

export default function HomePage() {
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
                  className={`flex items-center text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {stat.change}
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
              This week
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="text-left py-3 font-medium">Employee</th>
                  <th className="text-left py-3 font-medium">Project</th>
                  <th className="text-left py-3 font-medium">Date</th>
                  <th className="text-right py-3 font-medium">Hours</th>
                  <th className="text-right py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEntries.map((entry, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-3 text-white">{entry.employee}</td>
                    <td className="py-3 text-gray-300">{entry.project}</td>
                    <td className="py-3 text-gray-400">{entry.date}</td>
                    <td className="py-3 text-right text-white font-medium">
                      {entry.hours}h
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.status === "Approved"
                            ? "bg-emerald-900/40 text-emerald-400"
                            : entry.status === "Pending"
                            ? "bg-yellow-900/40 text-yellow-400"
                            : "bg-red-900/40 text-red-400"
                        }`}
                      >
                        {entry.status}
                      </span>
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
