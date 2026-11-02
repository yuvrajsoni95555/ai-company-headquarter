"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { ApprovalModal } from "@/components/approvals/ApprovalModal";
import { Approval, ApprovalCategory } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CheckSquare,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Filter,
} from "lucide-react";

export default function ApprovalsPage() {
  const {
    approvals,
    approveRequest,
    rejectRequest,
    requestRevision,
    approveAllSevenDayContent,
  } = useApp();

  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredApprovals = approvals.filter((a) => {
    if (activeTab !== "all" && a.status !== activeTab) {
      if (activeTab === "rejected" && a.status === "revision_requested") {
        // show revision requested in rejected tab
      } else {
        return false;
      }
    }
    if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
    return true;
  });

  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#121c2e] to-[#090d16]">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Founder Approval Center • Rule 9 Mandate</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            High-Impact Action & Spend Authorization
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Strict gatekeeper: No autonomous agent may publish social posts, spend money, change website code, or enter contracts without your explicit sign-off. Silence is never consent.
          </p>
        </div>

        {/* Batch Actions */}
        <button
          onClick={approveAllSevenDayContent}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Batch Approve 7-Day Content</span>
        </button>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1e293b]">
        {/* Status Tabs */}
        <div className="flex items-center space-x-2">
          {(["pending", "approved", "rejected", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
              }`}
            >
              {tab === "pending" ? `Pending (${pendingCount})` : tab}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-slate-300 text-xs outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Categories</option>
            <option value="social_post">Social Posts</option>
            <option value="financial_spend">Financial Spend / Ads</option>
            <option value="website_change">Website Code Changes</option>
            <option value="subscription">Subscriptions</option>
            <option value="contract">Contracts</option>
          </select>
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[#1e293b] bg-[#0f172a]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-200">No Approvals Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are no action requests matching your current status or filter.
            </p>
          </div>
        ) : (
          filteredApprovals.map((appr) => (
            <div
              key={appr.id}
              className={`p-5 rounded-xl border bg-[#0f172a] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                appr.status === "pending"
                  ? "border-amber-500/40 shadow-lg shadow-amber-500/5 hover:border-amber-400/60"
                  : appr.status === "approved"
                  ? "border-emerald-500/30"
                  : "border-red-500/30"
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      appr.status === "pending"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : appr.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {appr.status.replace("_", " ")}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1e293b] text-slate-300 text-[10px] font-mono uppercase">
                    {appr.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Submitted {formatDate(appr.submittedAt)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{appr.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {appr.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>
                    Requesting Agent: <strong className="text-slate-200">{appr.requestingAgentName}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Department: <strong className="text-slate-200">{appr.department}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Budget:{" "}
                    <strong className="text-emerald-400 font-mono">
                      {appr.budgetAmount > 0 ? formatCurrency(appr.budgetAmount) : "$0.00"}
                    </strong>
                  </span>
                </div>

                {appr.founderNotes && (
                  <div className="mt-2 p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b] text-xs text-amber-200">
                    <strong>Founder Notes:</strong> {appr.founderNotes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end md:self-center">
                {appr.status === "pending" ? (
                  <>
                    <button
                      onClick={() => setSelectedApproval(appr)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 shadow-md transition-all"
                    >
                      Inspect & Decide
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedApproval(appr)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1e293b] text-slate-300 hover:text-white text-xs font-medium"
                  >
                    View Audit Record
                  </button>
                )}
              </div>
            </div>
          ))
        )}
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
