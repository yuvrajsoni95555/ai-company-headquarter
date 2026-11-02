"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { AIEmployee, AgentTier, PermissionLevel, AgentStatus } from "@/lib/types";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  Cpu,
  Shield,
  Star,
  Award,
  Power,
  X,
  Briefcase,
} from "lucide-react";
import Image from "next/image";

export default function EmployeesPage() {
  const { employees, departments, hireEmployee, updateEmployeeStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpCode, setNewEmpCode] = useState("");
  const [newEmpDesignation, setNewEmpDesignation] = useState("");
  const [newEmpDeptId, setNewEmpDeptId] = useState(departments[0]?.id || "");
  const [newEmpTier, setNewEmpTier] = useState<AgentTier>("specialist");
  const [newEmpModel, setNewEmpModel] = useState("gemini-1.5-pro");
  const [newEmpSkills, setNewEmpSkills] = useState("");
  const [newEmpResponsibilities, setNewEmpResponsibilities] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    if (selectedTier !== "all" && emp.tier !== selectedTier) return false;
    if (
      searchQuery &&
      !emp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpDesignation.trim()) {
      alert("Name and designation are required.");
      return;
    }

    hireEmployee({
      companyId: "comp-jewelux-01",
      departmentId: newEmpDeptId,
      employeeCode: newEmpCode.trim() || `EMP-${Date.now().toString().slice(-4)}`,
      name: newEmpName.trim(),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      designation: newEmpDesignation.trim(),
      tier: newEmpTier,
      model: newEmpModel,
      responsibilities: newEmpResponsibilities.split(",").map((s) => s.trim()).filter(Boolean),
      skills: newEmpSkills.split(",").map((s) => s.trim()).filter(Boolean),
      reportingManager: "Aegis Prime (CEO)",
      permissionLevel: newEmpTier === "director" ? "director" : "standard",
      status: "active",
    });

    // Reset Form
    setNewEmpName("");
    setNewEmpCode("");
    setNewEmpDesignation("");
    setNewEmpSkills("");
    setNewEmpResponsibilities("");
    setIsHireModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>AI Workforce Governance • Level 4 Autonomous Agents</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">AI Employee Directory</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Inspect credentials, model configurations, and live performance metrics for all autonomous agents across House of Jewelux.
          </p>
        </div>

        <button
          onClick={() => setIsHireModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Commission AI Employee</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "ceo", "supervisor", "director", "specialist"].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                selectedTier === tier
                  ? "bg-[#1e293b] text-[#d4af37] border border-[#d4af37]/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#121a2d]"
              }`}
            >
              {tier === "all" ? "All Agents" : tier}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agent name, designation, or ID..."
            className="text-xs pl-9 pr-4 py-2 rounded-xl bg-[#0f172a] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none w-full sm:w-64 placeholder:text-slate-600 transition-all"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="p-5 rounded-xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#d4af37] bg-amber-500/10 border border-amber-500/20">
                  {emp.employeeCode}
                </span>
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      emp.status === "active" || emp.status === "working"
                        ? "bg-emerald-400"
                        : emp.status === "idle"
                        ? "bg-amber-400"
                        : "bg-red-400"
                    }`}
                  ></span>
                  <span className="text-[10px] font-mono text-slate-300 capitalize">
                    {emp.status}
                  </span>
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-[#1e293b] group-hover:border-[#d4af37]/50 transition-colors">
                  <Image
                    src={emp.avatar}
                    alt={emp.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100 group-hover:text-[#d4af37] transition-colors">
                    {emp.name}
                  </h2>
                  <p className="text-xs text-slate-400">{emp.designation}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                      {emp.model}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                      {emp.tier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Task */}
              {emp.currentTask && (
                <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b] text-xs mb-3">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">
                    Current Task Assignment
                  </span>
                  <span className="text-slate-300 font-medium line-clamp-1">
                    {emp.currentTask}
                  </span>
                </div>
              )}

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {emp.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] bg-[#1e293b] text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance and Actions Footer */}
            <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-xs">
                <Star className="w-3.5 h-3.5 fill-emerald-400/20" />
                <span className="font-bold">{emp.performanceScore}%</span>
                <span className="text-[10px] text-slate-500">
                  ({emp.totalTasksCompleted} completed)
                </span>
              </div>

              {/* Status Toggle */}
              <select
                value={emp.status}
                onChange={(e) => updateEmployeeStatus(emp.id, e.target.value as AgentStatus)}
                className="text-[10px] font-mono bg-[#090d16] border border-[#1e293b] text-slate-300 px-2 py-1 rounded focus:border-[#d4af37] outline-none"
              >
                <option value="active">Active</option>
                <option value="working">Working</option>
                <option value="idle">Idle</option>
                <option value="under_review">Under Review</option>
                <option value="deactivated">Deactivated</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Hire Modal */}
      {isHireModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0f172a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold text-slate-100">Commission AI Employee</h3>
              </div>
              <button
                onClick={() => setIsHireModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleHireSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Agent Name</label>
                <input
                  type="text"
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Aurelius Sol"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Employee Code</label>
                  <input
                    type="text"
                    value={newEmpCode}
                    onChange={(e) => setNewEmpCode(e.target.value)}
                    placeholder="e.g. MKT-201"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Department</label>
                  <select
                    value={newEmpDeptId}
                    onChange={(e) => setNewEmpDeptId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Agent Tier</label>
                  <select
                    value={newEmpTier}
                    onChange={(e) => setNewEmpTier(e.target.value as AgentTier)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                  >
                    <option value="specialist">Specialist</option>
                    <option value="director">Director</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="apprentice">Apprentice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">AI Model Engine</label>
                  <select
                    value={newEmpModel}
                    onChange={(e) => setNewEmpModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none font-mono"
                  >
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    <option value="gpt-4o">GPT-4o (OpenAI)</option>
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Designation Title</label>
                <input
                  type="text"
                  value={newEmpDesignation}
                  onChange={(e) => setNewEmpDesignation(e.target.value)}
                  placeholder="e.g. Lead Gemstone Colorimetric Analyst"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newEmpSkills}
                  onChange={(e) => setNewEmpSkills(e.target.value)}
                  placeholder="e.g. Diamond Cut Analysis, Refraction Modeling, Photometry"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1e293b] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsHireModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1e293b] text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black font-bold hover:brightness-110 shadow-lg shadow-amber-500/20"
                >
                  Activate Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
