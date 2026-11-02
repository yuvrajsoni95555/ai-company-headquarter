"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { Task, TaskPriority, TaskStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  CheckSquare,
  Plus,
  Kanban,
  List,
  Clock,
  AlertCircle,
  CheckCircle2,
  X,
  User,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function TasksPage() {
  const { tasks, departments, employees, createTask, updateTaskStatus } = useApp();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New Task Form
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDeptId, setNewDeptId] = useState(departments[0]?.id || "");
  const [newPriority, setNewPriority] = useState<TaskPriority>("medium");
  const [newAssigneeId, setNewAssigneeId] = useState(employees[0]?.id || "");
  const [newDeadline, setNewDeadline] = useState("2026-11-06T18:00");

  const filteredTasks = tasks.filter((t) => {
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: "in_progress", label: "In Progress", color: "border-sky-500/40" },
    { id: "review", label: "Under Supervision Review", color: "border-purple-500/40" },
    { id: "pending_approval", label: "Pending Founder Approval", color: "border-amber-500/40" },
    { id: "completed", label: "Completed & Audited", color: "border-emerald-500/40" },
  ];

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assignedEmp = employees.find((e) => e.id === newAssigneeId) || employees[0];

    createTask({
      companyId: "comp-jewelux-01",
      departmentId: newDeptId,
      assignedTo: assignedEmp.id,
      assignedToName: assignedEmp.name,
      supervisorName: "Archon Prime (Chief Supervisor)",
      title: newTitle.trim(),
      description: newDesc.trim(),
      priority: newPriority,
      status: "in_progress",
      progress: 10,
      deadline: new Date(newDeadline).toISOString(),
      subtasks: [
        { id: "sub-1", title: "Analyze requirements and SOP alignment", completed: true },
        { id: "sub-2", title: "Execute core deliverables", completed: false },
        { id: "sub-3", title: "Submit to Independent Quality Control", completed: false },
      ],
    });

    setNewTitle("");
    setNewDesc("");
    setIsNewTaskModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-[#1e293b] bg-gradient-to-r from-[#0f172a] to-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#d4af37] text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Autonomous Execution Engine • Cross-Department Task Matrix</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Central Task Management</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Live telemetry of all operational missions, delegated subtasks, progress meters, and independent quality inspections.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-start md:self-auto">
          {/* View Mode Switcher */}
          <div className="p-1 rounded-xl bg-[#090d16] border border-[#1e293b] flex items-center space-x-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "kanban"
                  ? "bg-[#1e293b] text-[#d4af37]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "list"
                  ? "bg-[#1e293b] text-[#d4af37]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black text-xs font-bold hover:brightness-110 flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Commission Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="rounded-xl border border-[#1e293b] bg-[#0c121f] p-4 flex flex-col space-y-3 min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
                  <h3 className="text-xs font-bold text-slate-200">{col.label}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1e293b] text-slate-400">
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border border-[#1e293b] bg-[#0f172a] hover:border-[#d4af37]/40 transition-all text-xs space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                            task.priority === "critical"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : task.priority === "high"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {task.progress}%
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-100 line-clamp-2 leading-snug">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-[#1e293b] h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            task.progress === 100
                              ? "bg-emerald-400"
                              : "bg-gradient-to-r from-[#d4af37] to-amber-300"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>

                      {/* Meta Footer */}
                      <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[120px] font-medium text-slate-300">
                          {task.assignedToName}
                        </span>
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                          className="bg-[#090d16] border border-[#1e293b] text-slate-400 px-1.5 py-0.5 rounded text-[9px] focus:border-[#d4af37] outline-none"
                        >
                          <option value="in_progress">In Progress</option>
                          <option value="review">Review</option>
                          <option value="pending_approval">Approval</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-xl border border-[#1e293b] bg-[#0f172a] divide-y divide-[#1e293b] overflow-hidden">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#131d31] transition-colors"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      task.priority === "critical"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-sky-500/10 text-sky-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Supervisor: {task.supervisorName}
                  </span>
                </div>
                <h4 className="font-bold text-slate-100">{task.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{task.description}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block font-mono">Assigned Agent</span>
                  <span className="font-medium text-slate-200">{task.assignedToName}</span>
                </div>

                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                  className="bg-[#090d16] border border-[#1e293b] text-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-mono focus:border-[#d4af37] outline-none"
                >
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="pending_approval">Pending Approval</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0f172a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold text-slate-100">Commission Operational Task</h3>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Conduct Caustic Refraction Render for Royal Sapphire Capsule"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description & Objective</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detail the operational deliverable and quality benchmark..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Department</label>
                  <select
                    value={newDeptId}
                    onChange={(e) => setNewDeptId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Assigned Agent</label>
                <select
                  value={newAssigneeId}
                  onChange={(e) => setNewAssigneeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-[#d4af37] text-slate-200 outline-none"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-[#1e293b] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1e293b] text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89428] text-black font-bold hover:brightness-110 shadow-lg shadow-amber-500/20"
                >
                  Commission Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
