"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { ContentItem, SocialPlatform } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Share2,
  Copy,
  Layers,
  Send,
  Camera,
  CheckSquare,
} from "lucide-react";

export default function MarketingPage() {
  const { contentCalendar, approveAllSevenDayContent } = useApp();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredContent = contentCalendar.filter((item) => {
    if (selectedPlatform !== "all" && item.platform !== selectedPlatform) return false;
    return true;
  });

  const platforms: { id: string; label: string }[] = [
    { id: "all", label: "All Platforms (7 Days)" },
    { id: "instagram", label: "Instagram" },
    { id: "pinterest", label: "Pinterest" },
    { id: "youtube", label: "YouTube Shorts" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "threads", label: "Threads" },
    { id: "x", label: "X" },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allApproved = contentCalendar.every((i) => i.status === "approved" || i.status === "published");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#141b2a] via-[#101726] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketing & Content Engine • 7-Day Rolling Pipeline</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Rolling 7-Day Social Media Studio
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Curated by Content Director <strong>Caspian Reed</strong> & Social Media Director <strong>Zara Chen</strong>.
            All posts adhere to the House of Jewelux Brand Bible and require Founder authorization before automatic publication.
          </p>
        </div>

        <button
          onClick={approveAllSevenDayContent}
          disabled={allApproved}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg transition-all self-start md:self-auto ${
            allApproved
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
              : "bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black hover:brightness-110 shadow-amber-500/20"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{allApproved ? "7-Day Pipeline Approved" : "Approve Complete 7-Day Pipeline"}</span>
        </button>
      </div>

      {/* Platform Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#1e293b]">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlatform(p.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              selectedPlatform === p.id
                ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 7-Day Content Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContent.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-amber-500/5 space-y-4"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    {item.contentType}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    item.status === "approved"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                  }`}
                >
                  {item.status === "approved" ? "Authorized" : "Founder Review"}
                </span>
              </div>

              {/* Title & Scheduled Date */}
              <h2 className="text-sm font-bold text-slate-100 group-hover:text-[#d4af37] transition-colors">
                {item.title}
              </h2>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-1 font-mono">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>{formatDate(item.scheduledFor)}</span>
              </div>

              {/* Caption Box */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs text-slate-300 relative group/caption">
                <p className="line-clamp-4 leading-relaxed font-sans">{item.caption}</p>
                <button
                  onClick={() => handleCopy(item.id, item.caption)}
                  title="Copy caption"
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#1e293b] text-slate-400 hover:text-white transition-colors opacity-0 group-hover/caption:opacity-100"
                >
                  <Copy className="w-3 h-3" />
                </button>
                {copiedId === item.id && (
                  <span className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400">
                    Copied!
                  </span>
                )}
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 mt-2.5">
                {item.hashtags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[10px] font-mono text-amber-400/80 bg-amber-500/5 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Visual Prompt for Photographers / 3D Gen */}
              <div className="mt-3 p-3 rounded-xl bg-[#121c2e] border border-[#1e293b] text-[11px] text-slate-300 space-y-1">
                <span className="text-[10px] font-mono text-sky-400 font-bold flex items-center space-x-1 uppercase">
                  <Camera className="w-3 h-3" />
                  <span>3D / Macro Render Prompt</span>
                </span>
                <p className="line-clamp-3 leading-relaxed text-slate-400 italic">
                  &ldquo;{item.visualPrompt}&rdquo;
                </p>
              </div>
            </div>

            {/* Publication Status Footer */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px] font-mono">
                {item.status === "approved" ? "Queued for n8n auto-publish" : "Awaiting Founder Gate"}
              </span>
              <div className="flex items-center space-x-1.5">
                {item.status === "approved" && (
                  <span className="text-emerald-400 flex items-center space-x-1 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
