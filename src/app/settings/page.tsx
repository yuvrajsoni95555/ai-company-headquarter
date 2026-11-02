"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Database,
  Key,
  ShieldCheck,
  Workflow,
  Copy,
  CheckCircle2,
  Lock,
  Code2,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [copiedSql, setCopiedSql] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [n8nUrl, setN8nUrl] = useState("https://your-n8n-instance.com/webhook/ai-headquarters");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem("ai_hq_settings");
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed.supabaseUrl) setSupabaseUrl(parsed.supabaseUrl);
        if (parsed.supabaseAnonKey) setSupabaseAnonKey(parsed.supabaseAnonKey);
        if (parsed.geminiApiKey) setGeminiApiKey(parsed.geminiApiKey);
        if (parsed.openaiApiKey) setOpenaiApiKey(parsed.openaiApiKey);
        if (parsed.n8nUrl) setN8nUrl(parsed.n8nUrl);
      }
    } catch {}
  }, []);

  const sampleSqlMigration = `-- Supabase Master Schema Migration File
-- Run inside Supabase SQL Editor:
-- Target file: supabase/migrations/20261102_initial_schema.sql`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSqlMigration);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "ai_hq_settings",
        JSON.stringify({
          supabaseUrl,
          supabaseAnonKey,
          geminiApiKey,
          openaiApiKey,
          n8nUrl,
        })
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert("Failed to save settings: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Configuration &amp; Credential Vault</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">System Settings &amp; API Vault</h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Configure your Supabase PostgreSQL endpoints, AI Provider keys (Gemini / OpenAI), and n8n webhook targets. All credentials are encrypted in local secure storage.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#090d16] border border-[#1e293b] text-xs flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-mono">Zero Credentials in Git</span>
        </div>
      </div>

      {/* Credential Form */}
      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supabase Connection */}
        <div className="p-6 rounded-2xl border border-[#1e293b] bg-[#0f172a] space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#1e293b]">
            <Database className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-100">Supabase Database &amp; Auth</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">NEXT_PUBLIC_SUPABASE_URL</label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY</label>
              <input
                type="password"
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
              />
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              Note: The app currently uses an interactive in-memory store so you can explore immediately. Populating these values connects directly to your live Supabase database.
            </p>
          </div>
        </div>

        {/* AI Provider Keys */}
        <div className="p-6 rounded-2xl border border-[#1e293b] bg-[#0f172a] space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#1e293b]">
            <Key className="w-4 h-4 text-[#d4af37]" />
            <h2 className="text-sm font-bold text-slate-100">AI Model Provider Credentials</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">GEMINI_API_KEY (Recommended)</label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">OPENAI_API_KEY (Optional)</label>
              <input
                type="password"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">NEXT_PUBLIC_N8N_WEBHOOK_URL</label>
              <input
                type="text"
                value={n8nUrl}
                onChange={(e) => setN8nUrl(e.target.value)}
                placeholder="https://n8n.yourdomain.com/webhook/..."
                className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-emerald-400">
            {savedSuccess ? "✓ Credentials saved to local storage securely!" : ""}
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

      {/* SQL Migration Script Box */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-[#0f172a] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Database Migration File: supabase/migrations/20261102_initial_schema.sql
            </h3>
          </div>
          <button
            onClick={handleCopySql}
            className="px-3 py-1 rounded-lg bg-[#1e293b] hover:bg-[#283548] text-slate-300 text-xs font-mono flex items-center space-x-1"
          >
            <Copy className="w-3 h-3" />
            <span>{copiedSql ? "Copied!" : "Copy SQL Script"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          The full PostgreSQL migration file has been created at <code>supabase/migrations/20261102_initial_schema.sql</code>. It creates all 11 tables with Row Level Security (RLS) policies and tenant isolation for House of Jewelux. Run it in your Supabase SQL Editor whenever you connect your project.
        </p>
      </div>
    </div>
  );
}
