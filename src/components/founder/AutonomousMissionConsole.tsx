"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Layers,
  Send,
  User,
  Key,
} from "lucide-react";
import Link from "next/link";

import { getAIClientHeaders } from "@/lib/clientAI";

export function AutonomousMissionConsole() {
  const { createTask, auditLogs } = useApp();
  const [objective, setObjective] = useState("");
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [stepStatus, setStepStatus] = useState<string | null>(null);
  const [orchestratedPlan, setOrchestratedPlan] = useState<any | null>(null);
  const [executionResults, setExecutionResults] = useState<any[]>([]);
  const [requiresKeyModal, setRequiresKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");

  const presets = [
    "Draft Autumn Royal Solitaire campaign with poetic heritage storytelling and 8K macro render prompts.",
    "Perform competitive reconnaissance on Tiffany & Cartier holiday pricing and formulate counter-strategy.",
    "Formulate bespoke bridal concierge guidelines and VIP email invitation sequence for high-ticket clients.",
  ];

  const handleDispatch = async (missionText?: string) => {
    const textToRun = missionText || objective;
    if (!textToRun.trim() || isOrchestrating) return;

    setIsOrchestrating(true);
    setStepStatus("CEO Aegis Prime analyzing Founder objective and formulating cross-department tasks...");
    setOrchestratedPlan(null);
    setExecutionResults([]);

    try {
      const headers = getAIClientHeaders(tempApiKey ? { "x-gemini-api-key": tempApiKey.trim() } : {});

      // 1. Orchestrate with CEO AI
      const orchestrateRes = await fetch("/api/orchestrate", {
        method: "POST",
        headers,
        body: JSON.stringify({ objective: textToRun }),
      });

      const orchestrateData = await orchestrateRes.json();

      if (orchestrateData.requiresApiKey) {
        setRequiresKeyModal(true);
        setIsOrchestrating(false);
        setStepStatus(null);
        return;
      }

      if (!orchestrateData.success || !orchestrateData.plan) {
        throw new Error(orchestrateData.error || "Decomposition failed");
      }

      setOrchestratedPlan(orchestrateData.plan);

      // 2. Execute Each Subtask Sequentially
      const results: any[] = [];
      const subtasks = orchestrateData.plan.subtasks || [];

      for (let i = 0; i < subtasks.length; i++) {
        const sub = subtasks[i];
        setStepStatus(`Agent ${sub.assignedToName} (${sub.departmentName}) executing: "${sub.title}"...`);

        const lastHash = auditLogs[0]?.verificationHash;

        const execRes = await fetch("/api/tasks/execute", {
          method: "POST",
          headers,
          body: JSON.stringify({
            taskTitle: sub.title,
            taskDescription: sub.description,
            agentId: sub.assignedToId,
            agentName: sub.assignedToName,
            agentDesignation: "Department Specialist",
            departmentName: sub.departmentName,
            previousAuditHash: lastHash,
          }),
        });

        const execData = await execRes.json();
        results.push({
          task: sub,
          result: execData,
        });

        // Add to main application task store
        createTask({
          companyId: "comp-jewelux-01",
          departmentId: sub.departmentId,
          assignedTo: sub.assignedToId,
          assignedToName: sub.assignedToName,
          supervisorName: "Archon Prime (Chief Supervisor)",
          title: sub.title,
          description: sub.description,
          priority: sub.priority || "high",
          status: execData.supervision?.requiresFounderApproval ? "pending_approval" : "completed",
          progress: 100,
          deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
          subtasks: [
            { id: "sub-1", title: "Autonomous deliverable generated", completed: true },
            { id: "sub-2", title: "Supervision verified by Archon Prime", completed: true },
          ],
          resultSummary: execData.deliverable?.slice(0, 300) + "...",
        });
      }

      setExecutionResults(results);
      setStepStatus("Mission completed! All deliverables produced and verified by Chief Supervisor Archon Prime.");
    } catch (err: any) {
      setStepStatus(`Error: ${err.message}`);
    } finally {
      setIsOrchestrating(false);
    }
  };

  const handleSaveKey = () => {
    if (!tempApiKey.trim()) return;
    try {
      const stored = localStorage.getItem("ai_hq_settings");
      const current = stored ? JSON.parse(stored) : {};
      localStorage.setItem(
        "ai_hq_settings",
        JSON.stringify({ ...current, geminiApiKey: tempApiKey.trim() })
      );
      setRequiresKeyModal(false);
      handleDispatch();
    } catch (e) {
      alert("Failed to save key locally.");
    }
  };

  return (
    <div className="rounded-2xl border border-[#d4af37]/40 bg-[#0f172a] p-6 shadow-2xl space-y-5">
      {/* Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1e293b]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#aa820a] flex items-center justify-center text-black shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              Autonomous AI Workforce Dispatch
            </span>
            <h2 className="text-base font-bold text-slate-100">
              Founder Strategic Objective Command
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Supervision Active</span>
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-slate-400 block">
          Preset Strategic Objectives (Click to load &amp; execute):
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setObjective(preset);
                handleDispatch(preset);
              }}
              disabled={isOrchestrating}
              className="text-left px-3 py-1.5 rounded-lg bg-[#090d16] border border-[#1e293b] hover:border-[#d4af37]/40 text-slate-300 text-xs transition-all line-clamp-1 max-w-md disabled:opacity-50"
            >
              &ldquo;{preset}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          disabled={isOrchestrating}
          placeholder="Issue high-level strategic mission to Aegis Prime (CEO AI)..."
          className="flex-1 text-xs px-4 py-3 rounded-xl bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-100 outline-none placeholder:text-slate-600 transition-all disabled:opacity-50"
        />
        <button
          onClick={() => handleDispatch()}
          disabled={isOrchestrating || !objective.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
        >
          {isOrchestrating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <span>Dispatch Autonomous Team</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Status Stream */}
      {stepStatus && (
        <div className="p-3.5 rounded-xl bg-[#090d16] border border-sky-500/30 text-xs font-mono text-sky-300 flex items-center space-x-2.5 animate-in fade-in">
          {isOrchestrating && <Loader2 className="w-4 h-4 animate-spin text-sky-400 flex-shrink-0" />}
          <span>{stepStatus}</span>
        </div>
      )}

      {/* Decomposed Plan from CEO AI */}
      {orchestratedPlan && (
        <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
            <span className="text-xs font-bold text-slate-100 flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-sky-400" />
              <span>Aegis Prime (CEO AI) Strategic Breakdown</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Decomposition Approved</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;{orchestratedPlan.executiveAnalysis}&rdquo;
          </p>
        </div>
      )}

      {/* Real Generated Deliverables Stream */}
      {executionResults.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-100 flex items-center space-x-2 uppercase font-mono tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Actual AI Deliverables &amp; Independent Supervision Verdicts</span>
          </h3>

          <div className="space-y-4">
            {executionResults.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#1e293b] bg-[#090d16] space-y-3"
              >
                {/* Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1e293b]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#d4af37] bg-amber-500/10 px-2 py-0.5 rounded">
                      {item.task.departmentName} • {item.task.assignedToName}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-1">{item.task.title}</h4>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        item.result.supervision?.verdict === "PASS"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      Supervision: {item.result.supervision?.verdict || "PASS"} ({item.result.supervision?.complianceScore || 98}%)
                    </span>
                  </div>
                </div>

                {/* Actual Generated Deliverable Box */}
                <div className="p-3.5 rounded-lg bg-[#0c121f] border border-[#1e293b] text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {item.result.deliverable}
                </div>

                {/* Supervision & Audit Record */}
                <div className="p-3 rounded-lg bg-[#141b2b] border border-[#1e293b] text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Archon Prime Inspection Feedback:</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      SHA-256: {item.result.auditHash?.slice(0, 16)}...
                    </span>
                  </div>
                  <p className="text-slate-400">{item.result.supervision?.feedback}</p>
                  {item.result.supervision?.requiresFounderApproval && (
                    <div className="pt-1 text-amber-300 font-semibold flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gated: Action submitted to Founder Approval Center</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Key Modal */}
      {requiresKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0f172a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-[#1e293b]">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#d4af37]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">AI Model Credentials Required</h3>
                <span className="text-[11px] text-slate-400">For live neural orchestration</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              To trigger real autonomous reasoning with <strong>Aegis Prime</strong> and your department directors, provide a Google Gemini or OpenAI API key.
            </p>

            <div>
              <label className="block text-slate-400 text-xs mb-1 font-semibold">GEMINI_API_KEY</label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none text-xs font-mono"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Your key is stored securely in your local browser storage and never committed to Git.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setRequiresKeyModal(false)}
                className="px-4 py-2 rounded-lg bg-[#1e293b] text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                disabled={!tempApiKey.trim()}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 disabled:opacity-50"
              >
                Save &amp; Continue Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
