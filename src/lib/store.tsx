"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Company,
  Department,
  AIEmployee,
  Task,
  Approval,
  AuditLog,
  ContentItem,
  CompetitorReport,
  KnowledgeDocument,
  NotificationItem,
  AutomationWorkflow,
  TaskStatus,
} from "./types";
import {
  initialCompanies,
  initialDepartments,
  initialAIEmployees,
  initialTasks,
  initialApprovals,
  initialAuditLogs,
  initialContentCalendar,
  initialCompetitorReports,
  initialKnowledgeDocs,
  initialNotifications,
  initialWorkflows,
} from "./mockData";
import { generateVerificationHash } from "./utils";

interface AppContextType {
  activeCompany: Company;
  setActiveCompany: (company: Company) => void;
  companies: Company[];
  departments: Department[];
  employees: AIEmployee[];
  tasks: Task[];
  approvals: Approval[];
  auditLogs: AuditLog[];
  contentCalendar: ContentItem[];
  competitorReports: CompetitorReport[];
  knowledgeDocs: KnowledgeDocument[];
  notifications: NotificationItem[];
  workflows: AutomationWorkflow[];
  // Actions
  approveRequest: (approvalId: string, founderNotes?: string) => void;
  rejectRequest: (approvalId: string, founderNotes?: string) => void;
  requestRevision: (approvalId: string, founderNotes: string) => void;
  approveAllSevenDayContent: () => void;
  createTask: (task: Omit<Task, "id" | "logs">) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  hireEmployee: (employee: Omit<AIEmployee, "id" | "performanceScore" | "totalTasksCompleted">) => void;
  updateEmployeeStatus: (employeeId: string, status: AIEmployee["status"]) => void;
  addKnowledgeDoc: (doc: Omit<KnowledgeDocument, "id" | "updatedAt">) => void;
  markNotificationAsRead: (id: string) => void;
  toggleWorkflow: (id: string) => void;
  triggerEmergencyHold: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [activeCompany, setActiveCompany] = useState<Company>(initialCompanies[0]);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [employees, setEmployees] = useState<AIEmployee[]>(initialAIEmployees);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [contentCalendar, setContentCalendar] = useState<ContentItem[]>(initialContentCalendar);
  const [competitorReports] = useState<CompetitorReport[]>(initialCompetitorReports);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(initialKnowledgeDocs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(initialWorkflows);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedApprovals = localStorage.getItem("ai_hq_approvals");
      if (savedApprovals) setApprovals(JSON.parse(savedApprovals));

      const savedTasks = localStorage.getItem("ai_hq_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedEmployees = localStorage.getItem("ai_hq_employees");
      if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const appendAuditLog = (
    actorType: AuditLog["actorType"],
    actorName: string,
    action: string,
    targetEntity: string,
    targetId: string,
    complianceStatus: AuditLog["complianceStatus"],
    details: string
  ) => {
    const timestamp = new Date().toISOString();
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      companyId: activeCompany.id,
      actorType,
      actorName,
      action,
      targetEntity,
      targetId,
      complianceStatus,
      details,
      verificationHash: generateVerificationHash(actorName, action, timestamp),
      timestamp,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const approveRequest = (approvalId: string, founderNotes?: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    setApprovals((prev) =>
      prev.map((appr) =>
        appr.id === approvalId
          ? {
              ...appr,
              status: "approved",
              founderNotes: founderNotes || "Approved by Founder Yuvraj Soni",
              reviewedAt: new Date().toISOString(),
            }
          : appr
      )
    );

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Approved: ${target.title}`,
      "Approval",
      approvalId,
      "passed",
      `Authorized action for ${target.department}. Budget: $${target.budgetAmount}. Notes: ${founderNotes || "No extra notes"}`
    );

    // If related to social post calendar, mark all content items approved
    if (target.category === "social_post") {
      setContentCalendar((prev) =>
        prev.map((item) => ({ ...item, status: "approved" }))
      );
    }

    // Add success notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        companyId: activeCompany.id,
        type: "pending_approval",
        title: "Action Approved by Founder",
        message: `Approval granted for: ${target.title}`,
        severity: "success",
        isRead: false,
        link: "/approvals",
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const rejectRequest = (approvalId: string, founderNotes?: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    setApprovals((prev) =>
      prev.map((appr) =>
        appr.id === approvalId
          ? {
              ...appr,
              status: "rejected",
              founderNotes: founderNotes || "Rejected by Founder Yuvraj Soni",
              reviewedAt: new Date().toISOString(),
            }
          : appr
      )
    );

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Rejected: ${target.title}`,
      "Approval",
      approvalId,
      "flagged",
      `Rejected proposed action. Notes: ${founderNotes || "No reason given."}`
    );
  };

  const requestRevision = (approvalId: string, founderNotes: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    if (!target) return;

    setApprovals((prev) =>
      prev.map((appr) =>
        appr.id === approvalId
          ? {
              ...appr,
              status: "revision_requested",
              founderNotes,
              reviewedAt: new Date().toISOString(),
            }
          : appr
      )
    );

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Requested Revision: ${target.title}`,
      "Approval",
      approvalId,
      "passed",
      `Revision instructions: ${founderNotes}`
    );
  };

  const approveAllSevenDayContent = () => {
    setContentCalendar((prev) =>
      prev.map((item) => ({ ...item, status: "approved" }))
    );

    // Update approval card if it exists
    setApprovals((prev) =>
      prev.map((a) =>
        a.category === "social_post"
          ? { ...a, status: "approved", reviewedAt: new Date().toISOString() }
          : a
      )
    );

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      "Approved Complete 7-Day Social Content Pipeline",
      "ContentCalendar",
      "batch-7days",
      "passed",
      "Founder batch-approved all 7 days of luxury content across Instagram, Pinterest, YouTube, LinkedIn, Threads, and X."
    );
  };

  const createTask = (taskData: Omit<Task, "id" | "logs">) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      logs: [
        {
          timestamp: new Date().toISOString(),
          agent: "Founder / CEO Direct Wire",
          action: "Task Commissioned",
          note: `Commissioned with priority ${taskData.priority}`,
        },
      ],
    };
    setTasks((prev) => [newTask, ...prev]);

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Created Task: ${taskData.title}`,
      "Task",
      newTask.id,
      "passed",
      `Assigned to ${taskData.assignedToName}`
    );
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const hireEmployee = (
    employeeData: Omit<AIEmployee, "id" | "performanceScore" | "totalTasksCompleted">
  ) => {
    const newEmp: AIEmployee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
      performanceScore: 98.0,
      totalTasksCompleted: 0,
    };
    setEmployees((prev) => [...prev, newEmp]);

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Commissioned AI Employee: ${newEmp.name}`,
      "AIEmployee",
      newEmp.id,
      "passed",
      `Hired into department ${newEmp.departmentId} with designation ${newEmp.designation}. Model: ${newEmp.model}`
    );
  };

  const updateEmployeeStatus = (employeeId: string, status: AIEmployee["status"]) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === employeeId ? { ...e, status } : e))
    );
  };

  const addKnowledgeDoc = (docData: Omit<KnowledgeDocument, "id" | "updatedAt">) => {
    const newDoc: KnowledgeDocument = {
      ...docData,
      id: `kb-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    setKnowledgeDocs((prev) => [newDoc, ...prev]);

    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      `Added Knowledge Document: ${newDoc.title}`,
      "KnowledgeDocument",
      newDoc.id,
      "passed",
      `Category: ${newDoc.category}`
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
  };

  const triggerEmergencyHold = () => {
    setEmployees((prev) =>
      prev.map((e) => (e.status === "working" ? { ...e, status: "idle" } : e))
    );
    appendAuditLog(
      "founder",
      "Founder Yuvraj Soni",
      "EMERGENCY OVERRIDE: Global Operations Paused",
      "Global",
      "all",
      "flagged",
      "Founder pressed emergency stop. All autonomous agent background execution paused immediately."
    );
    alert("Emergency Pause Executed: All active AI employees set to idle mode.");
  };

  return (
    <AppContext.Provider
      value={{
        activeCompany,
        setActiveCompany,
        companies,
        departments,
        employees,
        tasks,
        approvals,
        auditLogs,
        contentCalendar,
        competitorReports,
        knowledgeDocs,
        notifications,
        workflows,
        approveRequest,
        rejectRequest,
        requestRevision,
        approveAllSevenDayContent,
        createTask,
        updateTaskStatus,
        hireEmployee,
        updateEmployeeStatus,
        addKnowledgeDoc,
        markNotificationAsRead,
        toggleWorkflow,
        triggerEmergencyHold,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
