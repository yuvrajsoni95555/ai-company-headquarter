"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  BrainCircuit,
  ShieldAlert,
  Hash,
  Users,
  Sparkles,
  Lock,
  Loader2,
} from "lucide-react";

export default function CommunicationsPage() {
  const { employees } = useApp();
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      channel: "general",
      sender: "Aegis Prime (CEO AI)",
      role: "Central Chief Executive Officer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "All Directors: Q4 Holiday High-Jewelry Campaign planning is active. Marketing and Content have submitted the 7-day social pipeline to Founder Yuvraj Soni. Photography and Video, ensure caustic render queues are prioritized.",
      timestamp: "2026-11-02T14:30:00Z",
      isFounder: false,
    },
    {
      id: "msg-2",
      channel: "creative",
      sender: "Julian Sterling",
      role: "Photography Director",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      content: "Marketing team: We have calibrated the dual key softbox rig for the 5-carat Ceylon Sapphire halo. Refraction index set to 1.77. Render batches 1 through 4 are passing visual QC with zero optical distortion.",
      timestamp: "2026-11-02T14:35:00Z",
      isFounder: false,
    },
    {
      id: "msg-3",
      channel: "governance",
      sender: "Archon Prime",
      role: "Chief Independent Supervisor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      content: "Audit Alert: Real-time policy evaluation completed across all 23 active channels. 0 policy violations detected. Founder approval gate strictly enforced on all external publication webhooks.",
      timestamp: "2026-11-02T14:40:00Z",
      isFounder: false,
    },
  ]);

  const channels = [
    { id: "general", label: "Executive Direct Wire", icon: BrainCircuit },
    { id: "creative", label: "Creative & Visuals", icon: Sparkles },
    { id: "growth", label: "Marketing & Growth", icon: Hash },
    { id: "governance", label: "Supervision & Audit", icon: ShieldAlert },
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userMsg = inputMessage.trim();
    setInputMessage("");

    // Append Founder message immediately
    const founderMsg = {
      id: `msg-${Date.now()}`,
      channel: selectedChannel,
      sender: "Founder Yuvraj Soni",
      role: "Supreme Owner & Founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: userMsg,
      timestamp: new Date().toISOString(),
      isFounder: true,
    };

    setMessages((prev) => [...prev, founderMsg]);
    setIsSending(true);

    try {
      const res = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: selectedChannel,
          message: userMsg,
          targetAgent: selectedChannel === "creative" ? "Julian Sterling (Photography Director)" : "Aegis Prime (CEO AI)",
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-reply`,
            channel: selectedChannel,
            sender: data.reply.sender,
            role: data.reply.role,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            content: data.reply.content,
            timestamp: new Date().toISOString(),
            isFounder: false,
          },
        ]);
      }
    } catch {
      // Offline fallback
    } finally {
      setIsSending(false);
    }
  };

  const filteredMessages = messages.filter(
    (m) => m.channel === selectedChannel || m.channel === "general"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inter-Agent Communication Matrix • Real-Time Dispatch</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">AI Communication Center</h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Centralized wire connecting the Founder, CEO AI, 23 Department Directors, and Independent Supervisors. All communications are audited for compliance.
          </p>
        </div>
      </div>

      {/* Main Communication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
        {/* Channel Selector Sidebar */}
        <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-4 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 pb-2 border-b border-[#1e293b]">
            Communication Channels
          </div>
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedChannel(c.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  selectedChannel === c.id
                    ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{c.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-[#1e293b] text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-mono">
              <Lock className="w-3 h-3" />
              <span>TLS 1.3 Encrypted Inter-Agent Wire</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Independent supervision actively parses messages for duplicate delegation or unauthorized commitments.
            </p>
          </div>
        </div>

        {/* Message Feed & Input Box */}
        <div className="md:col-span-3 rounded-2xl border border-[#1e293b] bg-[#0f172a] flex flex-col justify-between overflow-hidden">
          {/* Feed */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                  msg.isFounder
                    ? "bg-amber-500/10 border-amber-500/30 text-slate-100 ml-8"
                    : "bg-[#090d16] border-[#1e293b] text-slate-300 mr-8"
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-bold ${
                        msg.isFounder ? "text-[#d4af37]" : "text-sky-300"
                      }`}
                    >
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      • {msg.role}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
                <p className="leading-relaxed text-[11px] font-sans">{msg.content}</p>
              </div>
            ))}
            {isSending && (
              <div className="flex items-center space-x-2 text-xs text-sky-400 p-2 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Agent parsing transmission and formulating response...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-[#1e293b] bg-[#090d16] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isSending}
              placeholder={`Send Founder directive to #${selectedChannel} channel...`}
              className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-[#0f172a] border border-[#1e293b] focus:border-[#d4af37] text-slate-100 outline-none placeholder:text-slate-600 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-1.5 shadow-md transition-all disabled:opacity-50"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
