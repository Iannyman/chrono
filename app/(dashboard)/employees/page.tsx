"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Search,
  Users,
  UserCheck,
  Clock,
  Filter,
  ChevronDown,
  CalendarDays,
  X,
} from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

// JSON shape from API response
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

const API_URL = "/api/sessions/detailed";

const EmployeesPage = () => {
  const [personalIdInput, setPersonalIdInput] = useState("");
  const [selectedLine, setSelectedLine] = useState("All Lines");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [appliedPersonalId, setAppliedPersonalId] = useState("");
  const [appliedLine, setAppliedLine] = useState("All Lines");
  const [appliedDateRange, setAppliedDateRange] = useState<DateRange | undefined>();

  const [lineDropdownOpen, setLineDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const [employeeRecords, setEmployeeRecords] = useState<EmployeeReportDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoading(true);
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

        // const response = await fetch(API_URL);
        const apiResponse = await fetch(API_URL, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: formatDate(yesterday),
            to: formatDate(today),
          }),
        });

        const result: EmployeeApiResponse = await apiResponse.json();

        if (result.success === 1 && Array.isArray(result.data)) {
          setEmployeeRecords(result.data);
        } else {
          setEmployeeRecords([]);
          setError("Invalid employee data received.");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Error fetching employee data.");
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
    
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const parseReportingDay = (date?: string) => {
    if (!date) return null;

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const employeeRows = useMemo(() => {
    return employeeRecords.flatMap((day) =>
      day.sessions.map((session) => ({
        day,
        session,
      }))
    );
  }, [employeeRecords]);

  const productionLines = useMemo(() => {
    const lines = employeeRows
      .map(({ session }) => session.line_name)
      .filter(Boolean);

    return ["All Lines", ...Array.from(new Set(lines))];
  }, [employeeRows]);


  const handleSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    setAppliedPersonalId(personalIdInput.trim());
    setAppliedLine(selectedLine);
    setAppliedDateRange(dateRange);

    setLineDropdownOpen(false);
    setCalendarOpen(false);
  };


  const filteredEmployeeRows = employeeRows.filter(({ day, session }) => {
    const matchesPersonalId =
      appliedPersonalId === "" ||
      String(session.person_id).includes(appliedPersonalId);

    const matchesLine =
      appliedLine === "All Lines" || session.line_name === appliedLine;

    const employeeDate = parseReportingDay(day.reporting_day);

    const matchesDate =
      !appliedDateRange?.from && !appliedDateRange?.to
        ? true
        : employeeDate
          ? (!appliedDateRange?.from || employeeDate >= appliedDateRange.from) &&
          (!appliedDateRange?.to || employeeDate <= appliedDateRange.to)
          : false;

    return matchesPersonalId && matchesLine && matchesDate;
  });

  const totalEmployees = new Set(
    employeeRows.map(({ session }) => session.person_id)
  ).size;

  const activeSessions = employeeRows.filter(
    ({ session }) => !session.logout_timestamp
  ).length;

  const totalMinutesLogged = employeeRows.reduce(
    (sum, { session }) => sum + Number(session.session_minutes || 0),
    0
  );



  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-900 w-full">
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
            <p className="text-2xl font-bold text-white">{totalEmployees}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <UserCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Sessions</p>
            <p className="text-2xl font-bold text-white">{activeSessions}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 flex items-center gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <Clock className="h-6 w-6 text-[#4682B4]" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Minutes Logged</p>
            <p className="text-2xl font-bold text-white">
              {totalMinutesLogged}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mx-8 my-2"
      >
        {/* Search */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Employee List
          </h2>
          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Enter personal ID..."
              value={personalIdInput}
              onChange={(e) => setPersonalIdInput(e.target.value)}
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
              type="button"
              onClick={() => setLineDropdownOpen(!lineDropdownOpen)}
              className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2 w-full text-sm text-white hover:bg-gray-600 transition"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                {selectedLine}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${lineDropdownOpen ? "rotate-180" : ""
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
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition ${selectedLine === line
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

        {/* Date Range Filter */}
        <div className="sm:w-80 bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Date Range</h2>

          <div className="relative" ref={calendarRef}>
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2 w-full text-sm text-white hover:bg-gray-600 transition"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-400" />

                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                    </>
                  ) : (
                    <>From {formatDate(dateRange.from)}</>
                  )
                ) : (
                  "Select date range"
                )}
              </span>

              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${calendarOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {calendarOpen && (
              <div className="absolute z-20 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 text-white">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                  disabled={{
                    before: sixMonthsAgo,
                    after: today,
                  }}
                  excludeDisabled
                  className="text-white"
                />

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => setDateRange(undefined)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>

                  <button
                    onClick={() => setCalendarOpen(false)}
                    className="bg-[#4682B4] hover:bg-[#3a6f9a] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Search Button */}
        <div className="sm:w-40 bg-gray-800 rounded-xl shadow-md p-6 flex items-end">
          <button
            type="submit"
            className="w-full bg-[#4682B4] hover:bg-[#3a6f9a] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Employee Table */}
      <div className="mx-8 my-4 bg-gray-800 rounded-xl shadow-md p-6 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Employee Records
          </h2>
          <span className="text-xs text-gray-500">
            Showing {filteredEmployeeRows.length} of {employeeRows.length}
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className=" flex-1 min-h-0 overflow-y-auto overflow-x-auto
                        [scrollbar-width:thin]
                        [scrollbar-color:#4b5563_#1f2937]">

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="text-left py-3 font-medium">Personal ID</th>
                <th className="text-left py-3 font-medium">Name</th>
                <th className="text-left py-3 font-medium">Date</th>
                <th className="text-left py-3 font-medium">Time In</th>
                <th className="text-left py-3 font-medium">Time Out</th>
                <th className="text-left py-3 font-medium">Hrs/Week</th>
                <th className="text-left py-3 font-medium">Working Hours</th>
                <th className="text-left py-3 font-medium">Working Place</th>
                <th className="text-left py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-8 text-center text-gray-500 text-sm"
                  >
                    Loading employee records...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredEmployeeRows.map(({ day, session }) => (
                  <tr
                    key={session.log_id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-3 text-white font-medium">
                      {session.person_id}
                    </td>

                    <td className="py-3 text-white font-medium">
                      {session.person_first_name} {session.person_last_name}
                    </td>

                    <td className="py-3 text-gray-300">
                      {day.reporting_day}
                    </td>

                    <td className="py-3 text-gray-400">
                      {new Date(session.login_timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>

                    {/* verificare ca poate sa fie null */}
                    <td className="py-3 text-gray-400">
                      {session.logout_timestamp
                        ? new Date(session.logout_timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                        : "-"}
                    </td>

                    <td className="py-3 text-left text-white">
                      {session.session_minutes}
                    </td>

                    <td className="py-3 text-left text-gray-300">
                      {session.logout_timestamp
                        ? Math.round(
                          (new Date(session.logout_timestamp).getTime() -
                            new Date(session.login_timestamp).getTime()) /
                          (1000 * 60)
                        )
                        : "-"}
                    </td>

                    <td className="py-3 text-gray-400">
                      {session.line_name}
                    </td>

                    <td className="py-3 text-left">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {session.shift_name}
                      </span>
                    </td>
                  </tr>
                ))}

              {!loading && filteredEmployeeRows.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
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
