"use client";

import { useEffect, useState } from "react";
import { TRINIDAD_TZ, formatZoneTime, getVisitorTimeZone } from "@/lib/time";

export function Clocks() {
  const [tt, setTt] = useState("—");
  const [mine, setMine] = useState("—");

  useEffect(() => {
    const visitorTz = getVisitorTimeZone();
    function tick() {
      const now = new Date();
      setTt(formatZoneTime(now, TRINIDAD_TZ));
      setMine(formatZoneTime(now, visitorTz));
    }
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap gap-[18px]">
      <span>
        Trinidad <b className="font-medium text-white">{tt}</b>
      </span>
      <span>
        Your time <b className="font-medium text-white">{mine}</b>
      </span>
    </div>
  );
}
