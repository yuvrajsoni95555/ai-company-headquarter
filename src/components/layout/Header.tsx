"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import {
  Bell,
  ShieldAlert,
  Search,
  CheckCircle,
  ExternalLink,
  Crown,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const { activeCompany, notifications, markNotificationAsRead, triggerEmergencyHold } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 border-b border-[#1e293b] bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Left: Active Company Pill */}
      <div className="flex items-center space-x-4">
        <Link
          href="/companies"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-[#d4af37]/40 transition-all text-xs"
        >
          <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-semibold text-slate-200">{activeCompany.name}</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono uppercase">
            Active
          </span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </Link>

        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400">
          <span className="text-slate-600">•</span>
          <span>Compliance: <strong className="text-emerald-400 font-mono">99.4%</strong></span>
          <span className="text-slate-600">•</span>
          <span>Active Agents: <strong className="text-[#d4af37] font-mono">84</strong></span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Emergency Stop Button */}
        <button
          onClick={triggerEmergencyHold}
          title="Emergency Stop: Halt all autonomous agent background operations"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 transition-all text-xs font-semibold"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">Emergency Pause</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 text-slate-300 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black font-bold text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e293b] mb-2">
                <span className="text-xs font-bold text-slate-200">Alerts & Directives</span>
                <span className="text-[10px] text-slate-400">{unreadCount} unread</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-xs text-slate-500 text-center py-4">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        n.isRead
                          ? "bg-[#090d16]/50 border-[#1e293b] text-slate-400"
                          : "bg-[#162032] border-[#d4af37]/30 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-semibold text-[11px] ${
                            n.severity === "urgent"
                              ? "text-red-400"
                              : n.severity === "warning"
                              ? "text-amber-400"
                              : n.severity === "success"
                              ? "text-emerald-400"
                              : "text-sky-400"
                          }`}
                        >
                          {n.title}
                        </span>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                      {n.link && (
                        <Link
                          href={n.link}
                          className="inline-flex items-center space-x-1 mt-1 text-[10px] text-[#d4af37] hover:underline"
                        >
                          <span>Review details</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
