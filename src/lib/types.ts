export type CompanyStatus = 'active' | 'paused' | 'archived';

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  industry: string;
  founderName: string;
  status: CompanyStatus;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  metrics: {
    activeEmployees: number;
    departmentsCount: number;
    tasksCompleted: number;
    complianceScore: number;
    monthlyBurn: number;
  };
}

export interface Department {
  id: string;
  companyId: string;
  name: string;
  slug: string;
  code: string;
  directorName: string;
  directorAvatar: string;
  directorModel: string;
  description: string;
  employeeCount: number;
  activeTasksCount: number;
  healthScore: number;
  budgetAllocated: number;
  category: 'growth' | 'creative' | 'operations' | 'governance' | 'technology';
}

export type AgentTier = 'ceo' | 'director' | 'supervisor' | 'specialist' | 'apprentice';
export type AgentStatus = 'active' | 'idle' | 'working' | 'under_review' | 'deactivated';
export type PermissionLevel = 'supreme' | 'executive' | 'director' | 'standard' | 'restricted';

export interface AIEmployee {
  id: string;
  companyId: string;
  departmentId: string;
  employeeCode: string;
  name: string;
  avatar: string;
  designation: string;
  tier: AgentTier;
  model: string;
  responsibilities: string[];
  skills: string[];
  reportingManager: string;
  permissionLevel: PermissionLevel;
  status: AgentStatus;
  performanceScore: number;
  totalTasksCompleted: number;
  currentTask?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'pending_approval' | 'completed' | 'failed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskLog {
  timestamp: string;
  agent: string;
  action: string;
  note: string;
}

export interface Task {
  id: string;
  companyId: string;
  departmentId: string;
  assignedTo: string;
  assignedToName: string;
  supervisorName: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  deadline: string;
  subtasks: Subtask[];
  logs: TaskLog[];
  resultSummary?: string;
}

export type ApprovalCategory = 
  | 'social_post' 
  | 'campaign' 
  | 'financial_spend' 
  | 'subscription' 
  | 'contract' 
  | 'website_change' 
  | 'irreversible_op';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'revision_requested';

export interface Approval {
  id: string;
  companyId: string;
  taskId?: string;
  requestingAgentId: string;
  requestingAgentName: string;
  department: string;
  title: string;
  category: ApprovalCategory;
  description: string;
  budgetAmount: number;
  proposedChanges: string;
  payloadDiff?: Record<string, unknown>;
  status: ApprovalStatus;
  founderNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export type ComplianceStatus = 'passed' | 'flagged' | 'violation';

export interface AuditLog {
  id: string;
  companyId: string;
  actorType: 'founder' | 'ceo' | 'director' | 'agent' | 'supervisor' | 'system';
  actorName: string;
  action: string;
  targetEntity: string;
  targetId: string;
  complianceStatus: ComplianceStatus;
  details: string;
  verificationHash: string;
  timestamp: string;
}

export type SocialPlatform = 'instagram' | 'facebook' | 'youtube' | 'pinterest' | 'linkedin' | 'threads' | 'x';
export type ContentType = 'carousel' | 'reel' | 'story' | 'post' | 'thread' | 'short';

export interface ContentItem {
  id: string;
  companyId: string;
  scheduledFor: string;
  platform: SocialPlatform;
  contentType: ContentType;
  title: string;
  caption: string;
  hashtags: string[];
  visualPrompt: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'rejected';
  approvalId?: string;
}

export interface CompetitorReport {
  id: string;
  companyId: string;
  competitorName: string;
  reportType: 'daily' | 'weekly' | 'monthly' | 'spotlight';
  keyFindings: string[];
  pricingIntelligence: {
    averagePricePoint: string;
    discountActivity: string;
    notableCollections: string;
  };
  marketingMoves: string[];
  sourceLinks: string[];
  confidenceScore: number;
  reportDate: string;
}

export interface KnowledgeDocument {
  id: string;
  companyId: string;
  title: string;
  category: 'brand_guidelines' | 'sop' | 'product_spec' | 'strategy' | 'policy' | 'market_data';
  content: string;
  tags: string[];
  author: string;
  version: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  companyId: string;
  type: 'task_completion' | 'pending_approval' | 'anomaly' | 'discovery' | 'system_alert';
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'urgent';
  isRead: boolean;
  link: string;
  timestamp: string;
}

export interface AutomationWorkflow {
  id: string;
  companyId: string;
  name: string;
  triggerEvent: string;
  webhookUrl: string;
  isActive: boolean;
  executionCount: number;
  lastExecutedAt?: string;
}
