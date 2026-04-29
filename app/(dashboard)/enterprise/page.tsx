"use client";

import {
  FolderKanban,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Timer,
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  department: string;
  lead: string;
  status: "On Track" | "At Risk" | "Completed";
  totalEmployees: number;
  totalHours: number;
  budgetedHours: number;
  weekHours: number;
}

const projects: Project[] = [
  { id: 1, name: "Assembly Line A", department: "Production", lead: "Pedro Garcia", status: "On Track", totalEmployees: 15, totalHours: 4200, budgetedHours: 5000, weekHours: 120 },
  { id: 2, name: "Assembly Line B", department: "Production", lead: "Carlos Mendez", status: "On Track", totalEmployees: 12, totalHours: 3800, budgetedHours: 4500, weekHours: 96 },
  { id: 3, name: "Quality Control", department: "Quality Assurance", lead: "Elena Rivera", status: "At Risk", totalEmployees: 8, totalHours: 2400, budgetedHours: 2500, weekHours: 72 },
  { id: 4, name: "Packaging Dept.", department: "Packaging", lead: "Ana Cruz", status: "On Track", totalEmployees: 7, totalHours: 1800, budgetedHours: 2200, weekHours: 56 },
  { id: 5, name: "Maintenance", department: "Facilities", lead: "David Ong", status: "Completed", totalEmployees: 6, totalHours: 1100, budgetedHours: 1100, weekHours: 40 },
  { id: 6, name: "Warehouse Ops", department: "Logistics", lead: "Mark Villanueva", status: "On Track", totalEmployees: 10, totalHours: 2900, budgetedHours: 3500, weekHours: 80 },
];

const statusConfig: Record<Project["status"], { color: string; icon: typeof CheckCircle2 }> = {
  "On Track": { color: "bg-emerald-900/40 text-emerald-400", icon: CheckCircle2 },
  "At Risk": { color: "bg-yellow-900/40 text-yellow-400", icon: AlertCircle },
  "Completed": { color: "bg-[#4682B4]/20 text-[#5B9BD5]", icon: CheckCircle2 },
};

const departmentSummary = [
  { department: "Production", projects: 2, employees: 27, hours: 8000 },
  { department: "Quality Assurance", projects: 1, employees: 8, hours: 2400 },
  { department: "Packaging", projects: 1, employees: 7, hours: 1800 },
  { department: "Facilities", projects: 1, employees: 6, hours: 1100 },
  { department: "Logistics", projects: 1, employees: 10, hours: 2900 },
];

const EnterprisePage = () => {
  const totalHours = projects.reduce((sum, p) => sum + p.totalHours, 0);
  const totalBudgeted = projects.reduce((sum, p) => sum + p.budgetedHours, 0);
  const totalWeekHours = projects.reduce((sum, p) => sum + p.weekHours, 0);
  const onTrackCount = projects.filter((p) => p.status === "On Track").length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Header */}
      <div className="mx-8 mt-8 mb-2">
        <h1 className="text-2xl font-bold text-white">Enterprise</h1>
        <p className="text-gray-400 text-sm mt-1">
          Projects overview, resource allocation, and department performance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <FolderKanban className="h-6 w-6 text-[#4682B4]" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Projects</p>
            <p className="text-2xl font-bold text-white">{projects.length}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Hours Logged</p>
            <p className="text-2xl font-bold text-white">
              {totalHours.toLocaleString()}h
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Users className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Assigned Employees</p>
            <p className="text-2xl font-bold text-white">
              {projects.reduce((sum, p) => sum + p.totalEmployees, 0)}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Timer className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">This Week</p>
            <p className="text-2xl font-bold text-white">{totalWeekHours}h</p>
          </div>
        </div>
      </div>

      {/* Budget Progress + Department Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-8 my-2">
        {/* Budget Progress */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Project Budget Progress
            </h2>
            <span className="text-xs text-gray-500">
              {onTrackCount} of {projects.length} on track
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {projects.map((project) => {
              const percentage = Math.round(
                (project.totalHours / project.budgetedHours) * 100
              );
              const isOver = percentage >= 90;
              const { color, icon: StatusIcon } = statusConfig[project.status];

              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">
                        {project.name}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">
                        {project.totalHours.toLocaleString()}h / {project.budgetedHours.toLocaleString()}h
                      </span>
                      <span
                        className={`font-medium ${
                          isOver ? "text-yellow-400" : "text-emerald-400"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isOver
                          ? "bg-yellow-500"
                          : "bg-[#4682B4]"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>Lead: {project.lead}</span>
                    <span>{project.totalEmployees} employees</span>
                    <span>{project.weekHours}h this week</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">
              By Department
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {departmentSummary.map((dept) => (
              <div
                key={dept.department}
                className="bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-medium">
                    {dept.department}
                  </span>
                  <span className="text-sm text-gray-400">
                    {dept.hours.toLocaleString()}h
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{dept.projects} project{dept.projects > 1 ? "s" : ""}</span>
                  <span>{dept.employees} employees</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total budgeted</span>
              <span className="text-white font-semibold">
                {totalBudgeted.toLocaleString()}h
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Consumed</span>
              <span className="text-[#4682B4] font-semibold">
                {Math.round((totalHours / totalBudgeted) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePage;
