"use client";

import { useState } from "react";
import { setAvailability } from "@/actions/tutor.actions";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6am to 10pm

function formatHour(h: number) {
  const period = h >= 12 ? "PM" : "AM";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}${period}`;
}

type SlotKey = `${number}-${number}`;

interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
}

export function AvailabilityGrid({ initialSlots }: { initialSlots: AvailabilitySlot[] }) {
  const [selected, setSelected] = useState<Set<SlotKey>>(() => {
    const set = new Set<SlotKey>();
    for (const slot of initialSlots) {
      const hour = parseInt(slot.startTime.split(":")[0], 10);
      set.add(`${slot.dayOfWeek}-${hour}`);
    }
    return set;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleSlot(day: number, hour: number) {
    const key: SlotKey = `${day}-${hour}`;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    const slots = Array.from(selected).map((key) => {
      const [day, hour] = key.split("-").map(Number);
      return {
        dayOfWeek: day,
        startTime: `${String(hour).padStart(2, "0")}:00`,
        endTime: `${String(hour + 1).padStart(2, "0")}:00`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    });

    const result = await setAvailability(slots);
    setSaving(false);
    if (!result.success) {
      setError(result.error ?? "Failed to save");
    } else {
      setSaved(true);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Availability</h1>
          <p className="text-muted-foreground">
            Click the time slots when you are available to teach.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Availability"}
        </button>
      </div>

      {saved && (
        <p className="text-sm text-green-600">Availability saved successfully!</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-3 py-3 text-left font-medium text-muted-foreground w-20">
                Time
              </th>
              {DAYS.map((day) => (
                <th key={day} className="px-2 py-3 text-center font-medium text-muted-foreground">
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour} className="border-b last:border-0">
                <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
                  {formatHour(hour)}
                </td>
                {DAYS.map((_, dayIndex) => {
                  const key: SlotKey = `${dayIndex}-${hour}`;
                  const isSelected = selected.has(key);
                  return (
                    <td key={dayIndex} className="px-2 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleSlot(dayIndex, hour)}
                        className={`h-8 w-full rounded-md transition-colors ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-muted hover:bg-primary/20"
                        }`}
                        aria-label={`${DAYS[dayIndex]} ${formatHour(hour)}`}
                        aria-pressed={isSelected}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {selected.size} time slot{selected.size !== 1 ? "s" : ""} selected
      </p>
    </div>
  );
}
