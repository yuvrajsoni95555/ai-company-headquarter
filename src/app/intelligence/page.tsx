"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { CompetitorReport } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  TrendingUp,
  Search,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Award,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function IntelligencePage() {
  const { competitorReports } = useApp();
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("all");

  const filteredReports = competitorReports.filter((r) => {
    if (selectedCompetitor !== "all" && r.competitorName !== selectedCompetitor) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-[#0c182a] via-[#091424] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Market & Competitor Reconnaissance • Director Victor Stone</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Competitor Intelligence</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Continuous telemetry monitoring Tiffany &amp; Co., Cartier, and global high-jewelry maisons.
            All reports cite public verifiable sources and confidence ratings to identify actionable market gaps.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#0f172a] border border-[#1e293b] text-xs space-y-1">
          <div className="text-slate-400 text-[10px] uppercase font-mono">Telemetry Integrity</div>
          <div className="text-emerald-400 font-bold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Public Signals</span>
          </div>
        </div>
      </div>

      {/* Competitor Selector Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#1e293b]">
        {["all", "Tiffany & Co.", "Cartier"].map((name) => (
          <button
            key={name}
            onClick={() => setSelectedCompetitor(name)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCompetitor === name
                ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
            }`}
          >
            {name === "all" ? "All Competitors" : name}
          </button>
        ))}
      </div>

      {/* Intelligence Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-6 rounded-2xl border border-[#1e293b] bg-[#0f172a] hover:border-sky-500/30 transition-all space-y-5"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Maison Intelligence
                </span>
                <h2 className="text-lg font-bold text-slate-100">{report.competitorName}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {report.confidenceScore}% Confidence Rating
                </span>
                <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                  Audited: {report.reportDate}
                </span>
              </div>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Strategic Findings & Market Shifts</span>
              </h3>
              <ul className="space-y-2">
                {report.keyFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs text-slate-300 leading-relaxed flex items-start space-x-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0"></span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Intelligence */}
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pricing & Margins Telemetry</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Average Ticket Size</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {report.pricingIntelligence.averagePricePoint}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Discount Policy</span>
                  <span className="text-slate-300 font-medium">
                    {report.pricingIntelligence.discountActivity}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#1e293b]">
                  <span className="text-slate-400 block text-[10px]">Flagship Collections</span>
                  <span className="text-slate-300">
                    {report.pricingIntelligence.notableCollections}
                  </span>
                </div>
              </div>
            </div>

            {/* Marketing Tactics & Source Links */}
            <div className="pt-3 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-[11px]">Primary Sources:</span>
                {report.sourceLinks.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 flex items-center space-x-0.5 text-[11px] font-mono hover:underline"
                  >
                    <span>Source #{linkIdx + 1}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
