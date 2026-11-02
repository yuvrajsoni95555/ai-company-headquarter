"use client";

import React from "react";
import { useApp } from "@/lib/store";
import { MetricCard } from "@/components/layout/MetricCard";
import { formatCurrency } from "@/lib/utils";
import {
  BrainCircuit,
  Target,
  Workflow,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function CEODashboard() {
  const { activeCompany, departments, employees, tasks } = useApp();

  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const strategicPillars = [
    {
      title: "Omnichannel High-Jewelry Positioning",
      owner: "Marketing & Social Media",
      progress: 92,
      impact: "High",
      status: "On Schedule",
    },
    {
      title: "8K Photorealistic Macro Visual Pipeline",
      owner: "Photography & Image Editing",
      progress: 78,
      impact: "Critical",
      status: "Rendering Queue Active",
    },
    {
      title: "HNW Bespoke Private Client Concierge",
      owner: "Sales & Customer Relations",
      progress: 88,
      impact: "High",
      status: "Operational",
    },
    {
      title: "Multi-Tenant Enterprise Isolation & RLS",
      owner: "Technology & AI Audit",
      progress: 100,
      impact: "Supreme",
      status: "Verified & Locked",
    },
  ];

  return (
    <div className="space-y-6">
      {/* CEO Executive Banner */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-[#0c192d] via-[#091322] to-[#090d16] p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Aegis Prime • Central Chief Executive Officer AI</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Autonomous Management Hub: <span className="text-sky-300">{activeCompany.name}</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Supervising and aligning all 23 department directors to achieve Founder Yuvraj Soni&apos;s strategic roadmap. Real-time telemetry evaluates workload distribution, bottleneck resolution, and cross-department synthesis.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b] text-xs space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-mono">CEO Directives Status</div>
            <div className="text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aligned with Founder Intent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Tasks in Flight"
          value={activeTasks.length}
          subtitle="Delegated across 23 divisions"
          icon={Workflow}
          trend="Active"
          isPositive={true}
        />
        <MetricCard
          title="Milestone Completion Rate"
          value="96.8%"
          subtitle="On-time delivery SLA"
          icon={Target}
          trend="+2.4%"
          isPositive={true}
          highlight={true}
        />
        <MetricCard
          title="AI Model Orchestration"
          value="Gemini 1.5 Pro / Flash"
          subtitle="Adaptive multi-tier compute"
          icon={Cpu}
          trend="Optimal"
          isPositive={true}
        />
        <MetricCard
          title="Monthly Operating Burn"
          value={formatCurrency(activeCompany.metrics.monthlyBurn)}
          subtitle="Within allocated budget"
          icon={TrendingUp}
          trend="Under Cap"
          isPositive={true}
        />
      </div>

      {/* Strategic Pillars & Operational Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Strategic Objectives */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Target className="w-4 h-4 text-sky-400" />
              <span>Current Strategic Priority Objectives</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Quarterly Target</span>
          </div>

          <div className="space-y-3.5">
            {strategicPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#1e293b] bg-[#090d16] text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{p.title}</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Owner: {p.owner}</span>
                  <span>Impact: <strong className="text-amber-400">{p.impact}</strong></span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-[#d4af37] h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CEO Cross-Department Synthesis Log */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                <span>Executive Cross-Department Synthesis</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Coordination
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-[#1e293b] bg-[#090d16] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">Marketing ↔ Photography</span>
                  <span className="text-slate-500 font-mono">14:10 GMT</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Aegis Prime routed the 7-day carousel brief from Marketing to Julian Sterling (Photography) to generate 8K caustic refractions for the Ceylon Sapphire capsule.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#1e293b] bg-[#090d16] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">Competitor Intel ↔ Sales</span>
                  <span className="text-slate-500 font-mono">11:50 GMT</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Detected 6-8 week fulfillment delay at Cartier for custom wedding solitaires. Commissioned Sales team to launch 3-week expedited bespoke campaign.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#1e293b] bg-[#090d16] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">Quality Control ↔ Content</span>
                  <span className="text-slate-500 font-mono">09:30 GMT</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Kaelen Voss (QC) verified gemstone specifications in Caspian Reed&apos;s heritage copy against GIA criteria. 100% factual accuracy confirmed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e293b] text-xs text-slate-400 flex items-center justify-between">
            <span>Next Executive Strategy Synthesis:</span>
            <span className="font-mono text-[#d4af37]">Tomorrow at 06:00 GMT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
