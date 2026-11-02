"use client";

import React, { useState } from "react";
import { Approval } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  DollarSign,
  Layers,
} from "lucide-react";

interface ApprovalModalProps {
  approval: Approval | null;
  onClose: () => void;
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, notes?: string) => void;
  onRequestRevision: (id: string, notes: string) => void;
}

export function ApprovalModal({
  approval,
  onClose,
  onApprove,
  onReject,
  onRequestRevision,
}: ApprovalModalProps) {
  const [founderNotes, setFounderNotes] = useState("");

  if (!approval) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#1e293b] flex items-center justify-between bg-[#090d16]/70">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Founder Governance Gate
              </span>
              <h2 className="text-base font-bold text-slate-100">{approval.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Requesting Agent</span>
              <span className="font-semibold text-slate-200">{approval.requestingAgentName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Department</span>
              <span className="font-semibold text-slate-200">{approval.department}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Category</span>
              <span className="font-mono text-amber-400 font-bold uppercase">{approval.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Budget Request</span>
              <span className="font-mono font-bold text-emerald-400">
                {approval.budgetAmount > 0 ? formatCurrency(approval.budgetAmount) : "$0.00"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Proposed Action Description
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-[#131d31] border border-[#1e293b]">
              {approval.description}
            </p>
          </div>

          {/* Payload Diff */}
          {approval.payloadDiff && (
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Payload Inspection / Diffs</span>
              </h3>
              <pre className="text-[11px] font-mono p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-amber-200/90 overflow-x-auto">
                {JSON.stringify(approval.payloadDiff, null, 2)}
              </pre>
            </div>
          )}

          {/* Founder Notes Input */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Founder Directive / Instructions (Optional for Approval, Mandatory for Revisions)
            </label>
            <textarea
              value={founderNotes}
              onChange={(e) => setFounderNotes(e.target.value)}
              placeholder="Add specific guidance or revision requirements for the requesting AI team..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          {/* Governance Notice */}
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-300/80 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Rule 9 Adherence:</strong> Founder approval is strictly binding and restricted to this exact payload. If content or budget parameters are altered, re-authorization is mandatory.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1e293b] bg-[#090d16] flex items-center justify-between">
          <button
            onClick={() => {
              onReject(approval.id, founderNotes);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Action</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                if (!founderNotes.trim()) {
                  alert("Please provide revision instructions in Founder Directives.");
                  return;
                }
                onRequestRevision(approval.id, founderNotes);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-xs font-semibold transition-all"
            >
              Request Revisions
            </button>
            <button
              onClick={() => {
                onApprove(approval.id, founderNotes);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-1.5 shadow-lg shadow-amber-500/20 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Authorize & Execute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
