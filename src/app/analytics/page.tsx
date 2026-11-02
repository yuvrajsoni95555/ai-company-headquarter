"use client";

import React from "react";
import { useApp } from "@/lib/store";
import { MetricCard } from "@/components/layout/MetricCard";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Cpu,
  Layers,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function AnalyticsPage() {
  const { activeCompany, departments } = useApp();

  const totalBudgetAllocated = departments.reduce((acc, d) => acc + d.budgetAllocated, 0);

  const computeMetrics = [
    { model: "Gemini 1.5 Pro (Directorial Tier)", cost: "$3,420", tokens: "84.2M tokens", share: "58%" },
    { model: "Gemini 1.5 Flash (Specialist Operations)", cost: "$860", tokens: "210.5M tokens", share: "14%" },
    { model: "High-Res Image Generation (Midjourney/Imagen)", cost: "$1,120", tokens: "4,200 renders", share: "19%" },
    { model: "Supabase & Cloud Compute Infrastructure", cost: "$550", tokens: "PostgreSQL HA", share: "9%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#0d1f1c] via-[#091514] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Finance Analysis &amp; Data Analytics • Director Gideon Wells</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Business &amp; Finance Overview</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Real-time financial telemetry for <strong>{activeCompany.name}</strong>. Tracking autonomous agent compute costs, division budget allocations, and high-jewelry revenue forecasting.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b] text-xs space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-mono block">Financial Integrity</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hedging &amp; Margin Secured</span>
          </span>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Operating Burn"
          value={formatCurrency(activeCompany.metrics.monthlyBurn)}
          subtitle="AI Compute & SaaS Subscriptions"
          icon={DollarSign}
          trend="-4.2% vs budget"
          isPositive={true}
          highlight={true}
        />
        <MetricCard
          title="Total Division Allocations"
          value={formatCurrency(totalBudgetAllocated)}
          subtitle="Across 23 departments"
          icon={Layers}
          trend="Balanced"
          isPositive={true}
        />
        <MetricCard
          title="Average Cost per Task"
          value="$1.42"
          subtitle="Blended multi-tier compute"
          icon={Cpu}
          trend="-18% MoM"
          isPositive={true}
        />
        <MetricCard
          title="Forecasted Q4 Jewelry Gross"
          value="$1.25M"
          subtitle="High-ticket bespoke sales"
          icon={TrendingUp}
          trend="+32% Projected"
          isPositive={true}
        />
      </div>

      {/* Compute Breakdown & Department Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Compute Cost Breakdown */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
            <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#d4af37]" />
              <span>Autonomous AI Compute Expenditure</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400">Live Telemetry</span>
          </div>

          <div className="space-y-3">
            {computeMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-200">{item.model}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.tokens}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-100">{item.cost}</span>
                  <span className="text-[10px] text-amber-400 font-mono block">{item.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Department Budget Allocations */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
            <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-sky-400" />
              <span>Highest Department Allocations</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Monthly Cap</span>
          </div>

          <div className="space-y-3">
            {departments
              .slice()
              .sort((a, b) => b.budgetAllocated - a.budgetAllocated)
              .slice(0, 5)
              .map((d) => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-200">{d.name}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Director: {d.directorName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#d4af37]">
                      {formatCurrency(d.budgetAllocated)}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      {d.employeeCount} AI Agents
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
