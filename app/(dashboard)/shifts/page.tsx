"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, Clock, Users, Layers } from "lucide-react";

type Shift = {
    id: number;
    line: string;
    name: string;
    supervisor: string;
    employees: number;
    start: string;
    end: string;
    status: "Active" | "Planned";
};

const shifts: Shift[] = [
    {
        id: 1,
        line: "Assembly Line A",
        name: "Morning Shift",
        supervisor: "Maria Santos",
        employees: 12,
        start: "06:00",
        end: "14:00",
        status: "Active",
    },
    {
        id: 2,
        line: "Assembly Line A",
        name: "Evening Shift",
        supervisor: "John Reyes",
        employees: 10,
        start: "14:00",
        end: "22:00",
        status: "Planned",
    },
    {
        id: 3,
        line: "Assembly Line B",
        name: "Night Shift",
        supervisor: "Ana Cruz",
        employees: 8,
        start: "22:00",
        end: "06:00",
        status: "Active",
    },
];

const productionLines = [
    "All Lines",
    "Assembly Line A",
    "Assembly Line B",
    "Assembly Line C",
];

const statusColor = {
    Active: "bg-emerald-900/40 text-emerald-400",
    Planned: "bg-blue-900/40 text-blue-400",
};


type Schedule = {
    [line: string]: {
        [day: string]: string[];
    };
};
const lines = ["Assembly Line A", "Assembly Line B", "Assembly Line C"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ShiftsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLine, setSelectedLine] = useState("All Lines");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const filteredShifts = shifts.filter((shift) => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            shift.name.toLowerCase().includes(query) ||
            shift.supervisor.toLowerCase().includes(query);

        const matchesLine =
            selectedLine === "All Lines" || shift.line === selectedLine;

        return matchesSearch && matchesLine;
    });

    const groupedByLine = productionLines
        .filter((l) => l !== "All Lines")
        .map((line) => ({
            line,
            shifts: filteredShifts.filter((s) => s.line === line),
        }));


    const [schedule, setSchedule] = useState<Schedule>(() => {
        const initial: Schedule = {};
        lines.forEach((line) => {
            initial[line] = {};
            days.forEach((day) => {
                initial[line][day] = [];
            });
        });
        return initial;
    });

    const toggleShift = (line: string, day: string, shift: string) => {
        setSchedule((prev) => {
            const current = prev[line][day];

            return {
                ...prev,
                [line]: {
                    ...prev[line],
                    [day]: current.includes(shift)
                        ? current.filter((s) => s !== shift)
                        : [...current, shift],
                },
            };
        });
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 w-full">
            {/* Header */}
            <div className="mx-8 mt-8 mb-4">
                <h1 className="text-2xl font-bold text-white">Weekly Shifts Configuration</h1>
                <p className="text-gray-400 text-sm mt-1">
                    Organize shifts by production line and visualize structure.
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-8">
                <div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center">
                    <Clock className="text-gray-400" />
                    <div>
                        <p className="text-gray-400 text-sm">Total Shifts</p>
                        <p className="text-xl font-bold text-white">
                            {shifts.length}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center">
                    <Users className="text-emerald-400" />
                    <div>
                        <p className="text-gray-400 text-sm">Active Shifts</p>
                        <p className="text-xl font-bold text-white">
                            {shifts.filter((s) => s.status === "Active").length}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl flex gap-4 items-center">
                    <Layers className="text-blue-400" />
                    <div>
                        <p className="text-gray-400 text-sm">Production Lines</p>
                        <p className="text-xl font-bold text-white">
                            {productionLines.length - 1}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mx-8 my-6">
                {/* Search */}
                <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-white font-semibold mb-2">Search</h2>
                    <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
                        <Search className="text-gray-400 h-4 w-4" />
                        <input
                            className="bg-transparent text-white px-2 flex-1 outline-none text-sm"
                            placeholder="Search shifts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Line Filter */}
                <div className="sm:w-72 bg-gray-800 p-6 rounded-xl">
                    <h2 className="text-white font-semibold mb-2">
                        Production Line
                    </h2>
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg flex justify-between items-center"
                        >
                            <span className="flex gap-2 items-center">
                                <Filter className="h-4 w-4" />
                                {selectedLine}
                            </span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute w-full mt-2 bg-gray-700 rounded-lg shadow-lg">
                                {productionLines.map((line) => (
                                    <button
                                        key={line}
                                        onClick={() => {
                                            setSelectedLine(line);
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-600 text-sm text-gray-300"
                                    >
                                        {line}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/* TABLE */}
            <div className="overflow-x-auto bg-gray-800 rounded-xl p-4 mx-8 mb-8">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="text-left p-3">Line</th>
                            {days.map((day) => (
                                <th key={day} className="p-3 text-center">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {lines.map((line) => (
                            <tr key={line} className="border-b border-gray-700/50">
                                <td className="p-3 font-medium text-white">
                                    {line}
                                </td>

                                {days.map((day) => (
                                    <td key={day} className="p-2 align-top">
                                        <div className="flex flex-col gap-1">
                                            {shifts.map((shift) => (
                                                <label
                                                    key={shift.name}
                                                    className="flex items-center gap-1 text-xs text-gray-300"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={schedule[line][day].includes(
                                                            shift.name
                                                        )}
                                                        onChange={() =>
                                                            toggleShift(line, day, shift.name)
                                                        }
                                                    />

                                                    <span>
                                                        {shift.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





            {/* Organigram / Cards */}
            <div className="mx-8 grid gap-6">
                {groupedByLine.map((group) => (
                    <div key={group.line}>
                        <h2 className="text-lg text-white font-semibold mb-3">
                            {group.line}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-4">
                            {group.shifts.map((shift) => (
                                <div
                                    key={shift.id}
                                    className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-white font-semibold">
                                            {shift.name}
                                        </h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${statusColor[shift.status]}`}
                                        >
                                            {shift.status}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-400 space-y-1">
                                        <p>
                                            Supervisor:{" "}
                                            <span className="text-white">
                                                {shift.supervisor}
                                            </span>
                                        </p>
                                        <p>
                                            Employees:{" "}
                                            <span className="text-white">
                                                {shift.employees}
                                            </span>
                                        </p>
                                        <p>
                                            Time:{" "}
                                            <span className="text-white">
                                                {shift.start} - {shift.end}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {group.shifts.length === 0 && (
                                <p className="text-gray-500 text-sm">
                                    No shifts for this line
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShiftsPage;