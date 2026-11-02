"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  Crown,
  LayoutDashboard,
  BrainCircuit,
  Building2,
  Users,
  CheckSquare,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Camera,
  FileText,
  BarChart3,
  Sliders,
  Settings,
  AlertTriangle,
  FolderLock,
  Workflow,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { activeCompany, approvals } = useApp();

  const pendingApprovalsCount = approvals.filter((a) => a.status === "pending").length;

  const navSections = [
    {
      title: "EXECUTIVE SUITE",
      items: [
        { name: "Founder Control Room", href: "/", icon: Crown, highlight: true },
        { name: "CEO Dashboard", href: "/ceo", icon: BrainCircuit },
        {
          name: "Approval Center",
          href: "/approvals",
          icon: CheckSquare,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        },
      ],
    },
    {
      title: "ORGANIZATION",
      items: [
        { name: "23 Departments", href: "/departments", icon: Building2 },
        { name: "AI Employee Directory", href: "/employees", icon: Users },
        { name: "Task Management", href: "/tasks", icon: LayoutDashboard },
        { name: "AI Communication Wire", href: "/communications", icon: MessageSquare },
      ],
    },
    {
      title: "GROWTH & CREATIVE",
      items: [
        { name: "Marketing & 7-Day Studio", href: "/marketing", icon: Sparkles },
        { name: "Competitor Intelligence", href: "/intelligence", icon: TrendingUp },
        { name: "Creative Render Studio", href: "/studio", icon: Camera },
        { name: "Knowledge Base", href: "/knowledge", icon: FileText },
      ],
    },
    {
      title: "GOVERNANCE & PLATFORM",
      items: [
        { name: "Supervision & Audit", href: "/supervision", icon: ShieldCheck },
        { name: "Business & Finance", href: "/analytics", icon: BarChart3 },
        { name: "Automation (n8n)", href: "/automation", icon: Workflow },
        { name: "Multi-Company Switcher", href: "/companies", icon: FolderLock },
        { name: "Settings & API Vault", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-[#090d16] border-r border-[#1e293b] flex flex-col h-screen sticky top-0 overflow-y-auto select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#aa820a] to-[#785b03] flex items-center justify-center shadow-lg shadow-amber-500/10 border border-amber-400/40">
            <Crown className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              AI Headquarters
            </div>
            <div className="text-sm font-bold text-slate-100 truncate max-w-[150px]">
              {activeCompany.name}
            </div>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-[#1e293b] text-[#d4af37] border-l-2 border-[#d4af37] shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? "text-[#d4af37]"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Founder Status Footer */}
      <div className="p-4 border-t border-[#1e293b] bg-[#0c121f]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 text-black font-bold flex items-center justify-center text-xs shadow-inner">
                YS
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090d16] rounded-full"></span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Yuvraj Soni</div>
              <div className="text-[10px] text-[#d4af37] font-medium tracking-wide">
                Founder & Supreme Owner
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
