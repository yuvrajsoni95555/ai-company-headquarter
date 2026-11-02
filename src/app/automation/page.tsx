"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  Workflow,
  Power,
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AutomationPage() {
  const { workflows, toggleWorkflow } = useApp();
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestTrigger = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      alert("Webhook successfully simulated: 200 OK received from n8n event dispatcher.");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-[#0c182a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>n8n Integration &amp; Event Dispatcher • Director Nexus Flow</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Automation Manager (n8n)</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Autonomous webhooks connecting House of Jewelux internal events to n8n pipelines, publishing approved social posts, triggering price telemetry alerts, and dispatching supervisor escalations.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-xs">
          <span className="text-slate-400 text-[10px] uppercase font-mono block">Infrastructure</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>n8n Webhook Node Connected</span>
          </span>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className={`p-5 rounded-xl border bg-[#0f172a] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              wf.isActive
                ? "border-sky-500/30 shadow-sm"
                : "border-[#1e293b] opacity-60"
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    wf.isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                  }`}
                ></span>
                <h3 className="text-sm font-bold text-slate-100">{wf.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-slate-300">
                  {wf.triggerEvent}
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-400 truncate max-w-xl">
                Webhook URL: <span className="text-sky-400">{wf.webhookUrl}</span>
              </div>

              <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-mono pt-1">
                <span>Total Executions: <strong>{wf.executionCount}</strong></span>
                <span>•</span>
                <span>
                  Last Run: {wf.lastExecutedAt ? formatDate(wf.lastExecutedAt) : "Never"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2.5 self-end sm:self-center">
              <button
                onClick={() => handleTestTrigger(wf.id)}
                disabled={testingId === wf.id}
                className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>{testingId === wf.id ? "Firing..." : "Test Webhook"}</span>
              </button>

              <button
                onClick={() => toggleWorkflow(wf.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  wf.isActive
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-[#1e293b] text-slate-400 hover:text-white"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{wf.isActive ? "Active" : "Disabled"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
