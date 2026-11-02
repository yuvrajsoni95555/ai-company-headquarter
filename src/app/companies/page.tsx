"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  Building2,
  Crown,
  CheckCircle2,
  Plus,
  ShieldCheck,
  FolderLock,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function CompaniesPage() {
  const { companies, activeCompany, setActiveCompany } = useApp();
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#141d2e] via-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <FolderLock className="w-3.5 h-3.5" />
            <span>Multi-Tenant Enterprise Isolation • Sovereign Holdings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Multi-Company Architecture</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Manage multiple independent companies from one centralized AI Headquarters. Currently activated: <strong>House of Jewelux</strong>. Each enterprise maintains isolated databases, CEO configurations, agent rosters, and knowledge bases.
          </p>
        </div>

        <button
          onClick={() => alert("Future Company Incubator: New tenant provisioning is ready. Row Level Security partition will be generated on confirmation.")}
          className="px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all self-start md:self-auto border border-[#1e293b]"
        >
          <Plus className="w-4 h-4 text-[#d4af37]" />
          <span>Provision Next Company</span>
        </button>
      </div>

      {/* Companies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => {
          const isActive = company.id === activeCompany.id;
          return (
            <div
              key={company.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                isActive
                  ? "border-[#d4af37]/60 bg-[#0f172a] shadow-xl shadow-amber-500/5 ring-1 ring-[#d4af37]/30"
                  : "border-[#1e293b] bg-[#0c121f] opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8c6d05] flex items-center justify-center text-black font-bold">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100">{company.name}</h2>
                    <span className="text-xs text-slate-400">{company.industry}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-[#1e293b] text-slate-400"
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{company.tagline}</p>

              {/* Company Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Active Agents</span>
                  <span className="font-mono font-bold text-slate-200">
                    {company.metrics.activeEmployees}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Departments</span>
                  <span className="font-mono font-bold text-slate-200">
                    {company.metrics.departmentsCount}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Monthly Burn</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {formatCurrency(company.metrics.monthlyBurn)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RLS Data Isolation Enforced</span>
                </div>

                {isActive ? (
                  <span className="text-xs font-bold text-[#d4af37] flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Workspace</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveCompany(company)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#d4af37] hover:text-black text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1"
                  >
                    <span>Switch to Company</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
