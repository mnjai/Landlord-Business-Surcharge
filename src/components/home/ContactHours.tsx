"use client";

import { useEffect, useState } from "react";
import { LONDON_TZ, NEW_YORK_TZ, TRINIDAD_TZ, formatZoneTime } from "@/lib/time";

export function ContactHours() {
  const [times, setTimes] = useState<{ tt: string; ny: string; uk: string }>({ tt: "—", ny: "—", uk: "—" });

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTimes({
        tt: formatZoneTime(now, TRINIDAD_TZ),
        ny: formatZoneTime(now, NEW_YORK_TZ),
        uk: formatZoneTime(now, LONDON_TZ),
      });
    }
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  const rows: [string, string][] = [
    ["Trinidad", times.tt],
    ["New York / Toronto", times.ny],
    ["London", times.uk],
  ];

  return (
    <div className="border border-[#35415A]">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between border-b border-[#35415A] px-4.5 py-3 font-mono text-[12.5px] text-[#B9C3D2]">
          <span>{label}</span>
          <b className="font-medium text-white tabular-figures">{value}</b>
        </div>
      ))}
      <div className="flex justify-between px-4.5 py-3 font-mono text-[12.5px] text-[#B9C3D2]">
        <span>Reply time, WhatsApp</span>
        <b className="font-medium text-white">Same day</b>
      </div>
    </div>
  );
}
