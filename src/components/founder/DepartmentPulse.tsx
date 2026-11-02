"use client";

import React from "react";
import { Department } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Activity, Users, ArrowUpRight } from "lucide-react";

export function DepartmentPulse({ departments }: { departments: Department[] }) {
  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
            <span>23 Autonomous Department Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time status, active agents, and health metrics across all company divisions
          </p>
        </div>
        <Link
          href="/departments"
          className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center space-x-1"
        >
          <span>View Detailed Roster</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="p-3.5 rounded-lg border border-[#1e293b] bg-[#090d16]/70 hover:border-[#d4af37]/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#d4af37] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {dept.code}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    dept.healthScore >= 98
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-amber-400 bg-amber-500/10"
                  }`}
                >
                  {dept.healthScore}% Health
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-[#d4af37] transition-colors truncate">
                {dept.name}
              </h3>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                Director: {dept.directorName}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1e293b]/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-slate-500" />
                <span>{dept.employeeCount} AI Agents</span>
              </span>
              <span className="font-mono text-slate-300">
                {dept.activeTasksCount} active tasks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
