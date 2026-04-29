"use client";

import { useState } from "react";
import { Search, Users, UserCheck, Clock, Filter, ChevronDown } from "lucide-react";

type EmployeeStatus = "Active" | "Inactive" | "On Leave";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  productionLine: string;
  status: EmployeeStatus;
  hoursThisWeek: number;
  totalHours: number;
}

const employees: Employee[] = [
  { id: 1, name: "Maria Santos", role: "Operator", department: "Production", productionLine: "Assembly Line A", status: "Active", hoursThisWeek: 40, totalHours: 1280 },
  { id: 2, name: "John Reyes", role: "Inspector", department: "Quality Assurance", productionLine: "Quality Control", status: "Active", hoursThisWeek: 38, totalHours: 1100 },
  { id: 3, name: "Ana Cruz", role: "Operator", department: "Packaging", productionLine: "Packaging Dept.", status: "Active", hoursThisWeek: 42, totalHours: 980 },
  { id: 4, name: "Carlos Mendez", role: "Operator", department: "Production", productionLine: "Assembly Line B", status: "Active", hoursThisWeek: 40, totalHours: 1450 },
  { id: 5, name: "Lisa Tan", role: "Technician", department: "Maintenance", productionLine: "Maintenance", status: "On Leave", hoursThisWeek: 0, totalHours: 870 },
  { id: 6, name: "Pedro Garcia", role: "Supervisor", department: "Production", productionLine: "Assembly Line A", status: "Active", hoursThisWeek: 45, totalHours: 2100 },
  { id: 7, name: "Rosa Lim", role: "Operator", department: "Production", productionLine: "Assembly Line B", status: "Inactive", hoursThisWeek: 0, totalHours: 560 },
  { id: 8, name: "Mark Villanueva", role: "Operator", department: "Packaging", productionLine: "Packaging Dept.", status: "Active", hoursThisWeek: 39, totalHours: 720 },
  { id: 9, name: "Elena Rivera", role: "Inspector", department: "Quality Assurance", productionLine: "Quality Control", status: "Active", hoursThisWeek: 40, totalHours: 1340 },
  { id: 10, name: "David Ong", role: "Technician", department: "Maintenance", productionLine: "Maintenance", status: "Active", hoursThisWeek: 36, totalHours: 920 },
];

const productionLines = [
  "All Lines",
  "Assembly Line A",
  "Assembly Line B",
  "Quality Control",
  "Packaging Dept.",
  "Maintenance",
];

const statusColor: Record<EmployeeStatus, string> = {
  Active: "bg-emerald-900/40 text-emerald-400",
  Inactive: "bg-gray-600/40 text-gray-400",
  "On Leave": "bg-yellow-900/40 text-yellow-400",
};

const EmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLine, setSelectedLine] = useState("All Lines");
  const [lineDropdownOpen, setLineDropdownOpen] = useState(false);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLine =
      selectedLine === "All Lines" || emp.productionLine === selectedLine;
    return matchesSearch && matchesLine;
  });

  const activeCount = employees.filter((e) => e.status === "Active").length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 w-full">
      {/* Header */}
      <div className="mx-8 mt-8 mb-2">
        <h1 className="text-2xl font-bold text-white">Employees</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage employee records, view hours, and filter by production line.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-8 my-4">
        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Users className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Employees</p>
            <p className="text-2xl font-bold text-white">{employees.length}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <UserCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active</p>
            <p className="text-2xl font-bold text-white">{activeCount}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Clock className="h-6 w-6 text-[#4682B4]" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Hours Logged</p>
            <p className="text-2xl font-bold text-white">
              {employees.reduce((sum, e) => sum + e.totalHours, 0).toLocaleString()}h
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mx-8 my-2">
        {/* Search */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Employee List
          </h2>
          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2 text-sm"
            />
          </div>
        </div>

        {/* Production Line Filter */}
        <div className="sm:w-72 bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Production Line
          </h2>
          <div className="relative">
            <button
              onClick={() => setLineDropdownOpen(!lineDropdownOpen)}
              className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2 w-full text-sm text-white hover:bg-gray-600 transition"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                {selectedLine}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  lineDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {lineDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg border border-gray-600 py-1">
                {productionLines.map((line) => (
                  <button
                    key={line}
                    onClick={() => {
                      setSelectedLine(line);
                      setLineDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition ${
                      selectedLine === line
                        ? "text-[#4682B4] font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {line}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="mx-8 my-4 bg-gray-800 rounded-xl shadow-md p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Employee Records
          </h2>
          <span className="text-xs text-gray-500">
            Showing {filteredEmployees.length} of {employees.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="text-left py-3 font-medium">Name</th>
                <th className="text-left py-3 font-medium">Role</th>
                <th className="text-left py-3 font-medium">Department</th>
                <th className="text-left py-3 font-medium">Production Line</th>
                <th className="text-right py-3 font-medium">Hrs/Week</th>
                <th className="text-right py-3 font-medium">Total Hrs</th>
                <th className="text-right py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 text-white font-medium">{emp.name}</td>
                  <td className="py-3 text-gray-300">{emp.role}</td>
                  <td className="py-3 text-gray-400">{emp.department}</td>
                  <td className="py-3 text-gray-400">{emp.productionLine}</td>
                  <td className="py-3 text-right text-white">
                    {emp.hoursThisWeek > 0 ? `${emp.hoursThisWeek}h` : "—"}
                  </td>
                  <td className="py-3 text-right text-gray-300">
                    {emp.totalHours.toLocaleString()}h
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[emp.status]}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-gray-500 text-sm"
                  >
                    No employees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
