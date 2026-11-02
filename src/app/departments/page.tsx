"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { Department } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Building2,
  Users,
  Search,
  Filter,
  CheckCircle,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DepartmentsPage() {
  const { departments, activeCompany } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredDepts = departments.filter((d) => {
    if (selectedCategory !== "all" && d.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.directorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.code.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const categories = [
    { id: "all", name: "All 23 Departments" },
    { id: "growth", name: "Growth & Market" },
    { id: "creative", name: "Creative & Media" },
    { id: "operations", name: "Operations & Sales" },
    { id: "governance", name: "Supervision & Audit" },
    { id: "technology", name: "Tech & Automation" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Organizational Hierarchy • Level 3 Directors</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            23 Autonomous Departments
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Each division is led by an executive AI Director managing specialized autonomous agents.
            Every department reports up to CEO AI <strong>Aegis Prime</strong> and independent supervision.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs flex items-center space-x-4">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Total Divisions</span>
            <span className="text-base font-bold text-slate-100 font-mono">23 / 23</span>
          </div>
          <div className="w-px h-8 bg-[#1e293b]"></div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Operational Health</span>
            <span className="text-base font-bold text-emerald-400 font-mono">98.2%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === c.id
                  ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department, director, or code..."
            className="text-xs pl-9 pr-4 py-2 rounded-xl bg-[#0f172a] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none w-full sm:w-64 placeholder:text-slate-600 transition-all"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="p-5 rounded-xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#d4af37] bg-amber-500/10 border border-amber-500/20">
                    {dept.code}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">
                    {dept.category}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    dept.healthScore >= 98
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                  }`}
                >
                  {dept.healthScore}% Health
                </span>
              </div>

              {/* Title & Desc */}
              <h2 className="text-base font-bold text-slate-100 group-hover:text-[#d4af37] transition-colors">
                {dept.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {dept.description}
              </p>

              {/* Director Info */}
              <div className="mt-4 p-3 rounded-lg bg-[#090d16] border border-[#1e293b] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                    <Image
                      src={dept.directorAvatar}
                      alt={dept.directorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 truncate max-w-[140px]">
                      {dept.directorName}
                    </div>
                    <div className="text-[10px] text-[#d4af37] font-mono">
                      {dept.directorModel}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Division Budget</span>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {formatCurrency(dept.budgetAllocated)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>{dept.employeeCount} Specialists</span>
              </span>
              <Link
                href={`/tasks?department=${dept.id}`}
                className="font-semibold text-slate-300 hover:text-[#d4af37] flex items-center space-x-1 group-hover:translate-x-0.5 transition-all"
              >
                <span>{dept.activeTasksCount} Active Tasks</span>
                <ArrowRight className="w-3 h-3 text-[#d4af37]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
