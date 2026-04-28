"use client";

import { useState } from "react";
import { subMonths } from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar() {
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 6);

    const [range, setRange] = useState<DateRange | undefined>();

    return (
        <div className="p-4 rounded-2xl w-fit">
            <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                defaultMonth={today}
                disabled={{
                    before: sixMonthsAgo,
                    after: today,
                }}
                excludeDisabled
                showOutsideDays
                classNames={{ 
                    day_selected: " hover:bg-[#fbfdc1] hover:text-gray-900",
                    day: "w-10 h-10 items-center justify-center rounded-xl hover:bg-[#fbfdc1] hover:text-gray-900",
                    day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
                    range_middle: "bg-[#fbfdc1] text-gray-900",
                    range_start: "bg-[#fbfdc1] text-gray-900 rounded-l-xl",
                    range_end: "bg-[#fbfdc1] text-gray-900 rounded-r-xl",
                    day_today: "font-semibold",
                }}
            />

            <button
                type="button"
                onClick={() => setRange(undefined)}
                className="mt-3 rounded-lg border px-3 py-2"
            >
                Reset
            </button>
        </div>
    );
}