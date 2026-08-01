"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Video, CheckCircle, Plus } from "lucide-react";
import { CalendarService, type CalendarSlot } from "@/services/api/calendar.service";

export function SchedulerCalendar({ candidateId, onSchedule }: { candidateId: number; onSchedule: (date: string, time: string, platform: string) => void }) {
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [platform, setPlatform] = useState("Google Meet");
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    CalendarService.getAvailability().then(setSlots);
  }, []);

  const dates = [...new Set(slots.map((s) => s.date))].slice(0, 7);

  const handleSchedule = async () => {
    if (!selectedSlot) return;
    const result = await CalendarService.scheduleInterview(candidateId, selectedSlot.date, selectedSlot.time, platform);
    if (result.success) {
      setScheduled(true);
      onSchedule(selectedSlot.date, selectedSlot.time, platform);
    }
  };

  if (scheduled) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center bg-white rounded-[18px] border border-slate-100 shadow-sm">
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Interview Scheduled!</h3>
        <p className="text-sm text-slate-500">{selectedSlot?.date} at {selectedSlot?.time} via {platform}</p>
        <p className="text-xs text-slate-400 mt-3">Meeting link sent via email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-[#2563EB]" /> Smart Interview Scheduler</h2>

      <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
        {dates.map((date) => (
          <button key={date} onClick={() => setSelectedDate(date)} className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${selectedDate === date ? "bg-[#2563EB] text-white" : "bg-white border border-slate-100 hover:bg-slate-50"}`}>
            <p className="text-xs opacity-70">{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <p className="text-sm font-bold">{new Date(date).getDate()}</p>
            <p className="text-xs opacity-70">{new Date(date).toLocaleDateString("en-US", { month: "short" })}</p>
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-400" /><span className="text-xs text-slate-400">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-xs text-slate-400">Booked</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {slots.filter((s) => s.date === selectedDate).map((slot) => (
              <button key={`${slot.date}-${slot.time}`} onClick={() => slot.available && setSelectedSlot(slot)} disabled={!slot.available} className={`p-3 rounded-xl text-center transition-all ${selectedSlot === slot ? "bg-[#2563EB] text-white" : slot.available ? "bg-green-50 hover:bg-green-100 text-slate-700" : "bg-slate-50 text-slate-300 cursor-not-allowed"}`}>
                <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                <span className="text-xs font-semibold">{slot.time}</span>
              </button>
            ))}
          </div>

          {selectedSlot && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Platform</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl outline-none bg-white">
                  <option>Google Meet</option>
                  <option>Zoom</option>
                  <option>Microsoft Teams</option>
                </select>
              </div>
              <button onClick={handleSchedule} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Schedule Interview
              </button>
            </div>
          )}
        </div>
      )}

      {!selectedDate && <p className="text-center text-sm text-slate-400 mt-8">Select a date to view available slots</p>}
    </div>
  );
}
