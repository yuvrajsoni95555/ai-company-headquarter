"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { MetricCard } from "@/components/layout/MetricCard";
import { DepartmentPulse } from "@/components/founder/DepartmentPulse";
import { ApprovalModal } from "@/components/approvals/ApprovalModal";
import { Approval } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Crown,
  Users,
  ShieldCheck,
  CheckSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  AlertTriangle,
  Lock,
  Layers,
  Send,
} from "lucide-react";

export default function FounderControlRoom() {
  const {
    activeCompany,
    departments,
    employees,
    approvals,
    auditLogs,
    approveRequest,
    rejectRequest,
    requestRevision,
    approveAllSevenDayContent,
    triggerEmergencyHold,
  } = useApp();

  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [directiveText, setDirectiveText] = useState("");
  const [directiveSent, setDirectiveSent] = useState(false);

  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const ceoAgent = employees.find((e) => e.tier === "ceo");

  const handleSendDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directiveText.trim()) return;
    setDirectiveSent(true);
    setTimeout(() => {
      setDirectiveText("");
      setDirectiveSent(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Founder Executive Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c1424] via-[#101a2e] to-[#090d16] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold">
              <Crown className="w-3.5 h-3.5" />
              <span>Supreme Authority Active • Level 1 Founder Control</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome, Founder <span className="gold-gradient-text">Yuvraj Soni</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Autonomous operations for <strong>{activeCompany.name}</strong> are running at{" "}
              <strong className="text-emerald-400">99.4% compliance</strong>. All 23 departments are coordinated under CEO AI{" "}
              <strong>Aegis Prime</strong> with independent supervision enforced.
            </p>
          </div>

          {/* Quick Founder Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={approveAllSevenDayContent}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-2 shadow-lg shadow-amber-500/10 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Approve 7-Day Content</span>
            </button>
            <Link
              href="/approvals"
              className="px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all border border-[#1e293b]"
            >
              <CheckSquare className="w-4 h-4 text-[#d4af37]" />
              <span>Review Approvals ({pendingApprovals.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active AI Employees"
          value={activeCompany.metrics.activeEmployees}
          subtitle="Across 23 departments"
          icon={Users}
          trend="+12 this month"
          isPositive={true}
          highlight={true}
        />
        <MetricCard
          title="Independent Supervision"
          value={`${activeCompany.metrics.complianceScore}%`}
          subtitle="Zero critical anomalies"
          icon={ShieldCheck}
          trend="Audited"
          isPositive={true}
        />
        <MetricCard
          title="Founder Approvals Pending"
          value={pendingApprovals.length}
          subtitle="Gated high-impact actions"
          icon={CheckSquare}
          trend={pendingApprovals.length > 0 ? "Action Required" : "All Clear"}
          isPositive={pendingApprovals.length === 0}
          highlight={pendingApprovals.length > 0}
        />
        <MetricCard
          title="Autonomous Departments"
          value={activeCompany.metrics.departmentsCount}
          subtitle="All directors reporting"
          icon={Layers}
          trend="100% Operational"
          isPositive={true}
        />
      </div>

      {/* CEO AI Direct Wire & Executive Directive Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CEO Briefing */}
        <div className="lg:col-span-2 rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100 flex items-center space-x-2">
                    <span>Aegis Prime (CEO AI)</span>
                    <span className="text-[10px] text-sky-400 font-mono font-normal">
                      [Autonomous Level 2]
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Executive Daily Operational Briefing</p>
                </div>
              </div>
              <Link
                href="/ceo"
                className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center space-x-1"
              >
                <span>Full CEO Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs text-slate-300 space-y-2.5 leading-relaxed">
              <p>
                <strong className="text-slate-100 font-semibold">Founder Soni:</strong> All 23 departments are operating within standard parameters. Marketing has submitted the 7-day social pipeline for your authorization. Competitor intelligence detected that Tiffany is backordered on emerald-cut solitaires—our Photography and Sales teams have prepared a targeted counter-campaign.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#1e293b] text-[11px]">
                <div>
                  <span className="text-slate-500 block">Q4 Target Focus</span>
                  <span className="font-semibold text-slate-200">High-Jewelry Holiday Launch</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Active Runway Burn</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {formatCurrency(activeCompany.metrics.monthlyBurn)}/mo
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Supervision Audit Hash</span>
                  <span className="font-mono text-[10px] text-amber-400/90 truncate block">
                    0x7a89f92...bc14
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Broadcast Directive to CEO & Organization */}
          <form onSubmit={handleSendDirective} className="mt-4 flex items-center space-x-2">
            <input
              type="text"
              value={directiveText}
              onChange={(e) => setDirectiveText(e.target.value)}
              placeholder="Broadcast Founder directive to CEO AI and all 23 Department Directors..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-100 outline-none placeholder:text-slate-600 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#d4af37] hover:text-black text-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <span>{directiveSent ? "Dispatched!" : "Dispatch"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Priority Approvals Box */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-100 flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <span>Founder Approval Queue</span>
              </h3>
              <Link href="/approvals" className="text-xs font-semibold text-[#d4af37] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {pendingApprovals.slice(0, 2).map((appr) => (
                <div
                  key={appr.id}
                  className="p-3 rounded-lg border border-[#1e293b] bg-[#090d16] hover:border-[#d4af37]/30 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 truncate max-w-[170px]">
                      {appr.title}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase">
                      {appr.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">
                    {appr.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1e293b]">
                    <span className="text-[10px] text-slate-500">{appr.department}</span>
                    <button
                      onClick={() => setSelectedApproval(appr)}
                      className="px-2.5 py-1 rounded-md bg-[#1e293b] hover:bg-[#d4af37] hover:text-black text-slate-200 text-[10px] font-bold transition-all"
                    >
                      Inspect & Decide
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e293b] text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span>Strict Gate: Zero unauthorized external dispatch</span>
            </span>
          </div>
        </div>
      </div>

      {/* 23 Departments Pulse */}
      <DepartmentPulse departments={departments} />

      {/* Recent Supervision & Immutable Audit Log Feed */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Supervision & Cryptographic Audit Stream</span>
            </h3>
            <p className="text-xs text-slate-400">
              Immutable ledger of agent actions, policy evaluations, and verification hashes
            </p>
          </div>
          <Link
            href="/supervision"
            className="text-xs font-semibold text-[#d4af37] hover:underline"
          >
            Open Audit Center
          </Link>
        </div>

        <div className="space-y-2">
          {auditLogs.slice(0, 4).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-lg border border-[#1e293b] bg-[#090d16] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start sm:items-center space-x-3">
                <span
                  className={`w-2 h-2 rounded-full mt-1 sm:mt-0 flex-shrink-0 ${
                    log.complianceStatus === "passed"
                      ? "bg-emerald-400"
                      : "bg-amber-400"
                  }`}
                ></span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-200">{log.actorName}</span>
                    <span className="text-slate-500 text-[10px]">•</span>
                    <span className="text-slate-400">{log.action}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono self-end sm:self-center">
                <span>{formatDate(log.timestamp)}</span>
                <span className="px-1.5 py-0.5 rounded bg-[#1e293b] text-amber-400/80">
                  {log.verificationHash.slice(0, 14)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Modal */}
      <ApprovalModal
        approval={selectedApproval}
        onClose={() => setSelectedApproval(null)}
        onApprove={approveRequest}
        onReject={rejectRequest}
        onRequestRevision={requestRevision}
      />
    </div>
  );
}
