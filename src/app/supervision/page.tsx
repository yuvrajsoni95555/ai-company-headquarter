"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { MetricCard } from "@/components/layout/MetricCard";
import { formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Search,
  CheckCircle2,
  FileCode2,
  Cpu,
  Layers,
  Fingerprint,
} from "lucide-react";

export default function SupervisionPage() {
  const { auditLogs, activeCompany } = useApp();
  const [filterCompliance, setFilterCompliance] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    if (filterCompliance !== "all" && log.complianceStatus !== filterCompliance) return false;
    if (
      searchQuery &&
      !log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.verificationHash.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#0c1c1f] via-[#091518] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Independent Supervision Architecture • Level 5 Autonomous Oversight</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Supervision &amp; Cryptographic Audit Center
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Led independently by <strong>Archon Prime (Chief Supervisor)</strong>, <strong>Kaelen Voss (Chief QC)</strong>, and <strong>Justiciar Vance (Chief Audit)</strong>. Monitors all autonomous operations, including the CEO, enforcing zero-tamper audit trails.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs flex items-center space-x-3">
          <Fingerprint className="w-6 h-6 text-emerald-400" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Immutable Ledger</span>
            <span className="text-xs font-mono font-bold text-slate-200">SHA-256 Verified</span>
          </div>
        </div>
      </div>

      {/* Governance & Integrity Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Policy Compliance"
          value="99.4%"
          subtitle="GIA and Brand standards"
          icon={ShieldCheck}
          trend="Certified"
          isPositive={true}
          highlight={true}
        />
        <MetricCard
          title="Hallucination Checks"
          value="100%"
          subtitle="420 automated checks passed"
          icon={Cpu}
          trend="0 Failures"
          isPositive={true}
        />
        <MetricCard
          title="Duplicate Work Prevented"
          value="14 Incidents"
          subtitle="De-duplication engine active"
          icon={Layers}
          trend="Clean"
          isPositive={true}
        />
        <MetricCard
          title="Unauthorized Access Attempts"
          value="0 Blocked"
          subtitle="Strict gating enforced"
          icon={Lock}
          trend="Secure"
          isPositive={true}
        />
      </div>

      {/* Audit Log Stream */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e293b]">
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Fingerprint className="w-4 h-4 text-[#d4af37]" />
              <span>Immutable Cryptographic Audit Trail</span>
            </h2>
            <p className="text-xs text-slate-400">
              Every agent operation is hashed and cryptographically signed. History cannot be modified or deleted.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterCompliance}
              onChange={(e) => setFilterCompliance(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-[#1e293b] text-slate-300 outline-none focus:border-[#d4af37]"
            >
              <option value="all">All Verification Statuses</option>
              <option value="passed">Passed Only</option>
              <option value="flagged">Flagged Only</option>
              <option value="violation">Violations Only</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail..."
                className="text-xs pl-8 pr-3 py-1.5 rounded-lg bg-[#090d16] border border-[#1e293b] text-slate-200 focus:border-[#d4af37] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Audit Log Entries */}
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl border border-[#1e293b] bg-[#090d16] space-y-2 hover:border-[#d4af37]/30 transition-all text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      log.complianceStatus === "passed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {log.complianceStatus}
                  </span>
                  <span className="font-bold text-slate-200">{log.actorName}</span>
                  <span className="text-slate-500 text-[10px] font-mono">• {log.actorType}</span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono">
                  <span>{formatDate(log.timestamp)}</span>
                  <span className="px-2 py-0.5 rounded bg-[#1e293b] text-amber-400">
                    Hash: {log.verificationHash}
                  </span>
                </div>
              </div>

              <div className="text-slate-300 font-semibold">{log.action}</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">{log.details}</p>

              <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Target Entity: {log.targetEntity} (ID: {log.targetId})</span>
                <span className="text-emerald-400/80">Tamper-Proof Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
