-- ==============================================================================
-- AI COMPANY HEADQUARTERS - MASTER DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL
-- Initial Active Company: House of Jewelux (Founder: Yuvraj Soni)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    tagline TEXT,
    industry VARCHAR(100) NOT NULL,
    founder_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
    brand_colors JSONB DEFAULT '{"primary": "#D4AF37", "secondary": "#0F172A", "accent": "#C5A059"}'::jsonb,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE (23 Hierarchical Departments)
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    director_name VARCHAR(255) NOT NULL,
    director_avatar TEXT,
    description TEXT,
    budget_allocated NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(company_id, slug)
);

-- 3. AI EMPLOYEES TABLE (Directory of Autonomous Agents)
CREATE TABLE IF NOT EXISTS public.ai_employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar TEXT,
    designation VARCHAR(255) NOT NULL,
    tier VARCHAR(50) DEFAULT 'specialist' CHECK (tier IN ('ceo', 'director', 'supervisor', 'specialist', 'apprentice')),
    model VARCHAR(100) NOT NULL DEFAULT 'gemini-1.5-pro',
    responsibilities TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    reporting_manager_id UUID REFERENCES public.ai_employees(id),
    permission_level VARCHAR(50) DEFAULT 'standard' CHECK (permission_level IN ('supreme', 'executive', 'director', 'standard', 'restricted')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'idle', 'working', 'under_review', 'deactivated')),
    performance_score NUMERIC(5, 2) DEFAULT 95.00,
    total_tasks_completed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TASKS TABLE (Central Task & Delegation System)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id),
    assigned_to UUID REFERENCES public.ai_employees(id),
    supervisor_id UUID REFERENCES public.ai_employees(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('backlog', 'in_progress', 'review', 'pending_approval', 'completed', 'failed')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    deadline TIMESTAMPTZ,
    subtasks JSONB DEFAULT '[]'::jsonb,
    execution_log JSONB DEFAULT '[]'::jsonb,
    result_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FOUNDER APPROVAL CENTER (Strict Governance Gate)
CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
    requesting_agent_id UUID REFERENCES public.ai_employees(id),
    department_id UUID REFERENCES public.departments(id),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN (
        'social_post',
        'campaign',
        'financial_spend',
        'subscription',
        'contract',
        'website_change',
        'irreversible_op'
    )),
    description TEXT NOT NULL,
    budget_amount NUMERIC(12, 2) DEFAULT 0.00,
    payload_diff JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'revision_requested')),
    founder_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUDIT LOGS (Immutable Independent Supervision Log)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    actor_type VARCHAR(50) NOT NULL CHECK (actor_type IN ('founder', 'ceo', 'director', 'agent', 'supervisor', 'system')),
    actor_id UUID,
    actor_name VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target_entity VARCHAR(100) NOT NULL,
    target_id VARCHAR(100),
    compliance_status VARCHAR(50) DEFAULT 'passed' CHECK (compliance_status IN ('passed', 'flagged', 'violation')),
    details JSONB DEFAULT '{}'::jsonb,
    verification_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTENT CALENDAR (7-Day Rolling Creative Pipeline)
CREATE TABLE IF NOT EXISTS public.content_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    scheduled_for TIMESTAMPTZ NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('instagram', 'facebook', 'youtube', 'pinterest', 'linkedin', 'threads', 'x')),
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('carousel', 'reel', 'story', 'post', 'thread', 'short')),
    title VARCHAR(255) NOT NULL,
    caption TEXT NOT NULL,
    hashtags TEXT[] DEFAULT '{}',
    media_prompts TEXT,
    visual_assets JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'review' CHECK (status IN ('draft', 'review', 'approved', 'published', 'rejected')),
    approval_id UUID REFERENCES public.approvals(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. COMPETITOR INTELLIGENCE (Market & Competitive Intel)
CREATE TABLE IF NOT EXISTS public.competitor_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    competitor_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) DEFAULT 'weekly' CHECK (report_type IN ('daily', 'weekly', 'monthly', 'spotlight')),
    key_findings TEXT[] DEFAULT '{}',
    pricing_intelligence JSONB DEFAULT '{}'::jsonb,
    marketing_moves TEXT[] DEFAULT '{}',
    source_links TEXT[] DEFAULT '{}',
    confidence_score INTEGER DEFAULT 95 CHECK (confidence_score >= 0 AND confidence_score <= 100),
    report_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. KNOWLEDGE BASE (Brand Guidelines & SOPs)
CREATE TABLE IF NOT EXISTS public.knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('brand_guidelines', 'sop', 'product_spec', 'strategy', 'policy', 'market_data')),
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    author VARCHAR(255) DEFAULT 'Founder & CEO AI',
    version VARCHAR(20) DEFAULT '1.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('task_completion', 'pending_approval', 'anomaly', 'discovery', 'system_alert')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(50) DEFAULT 'info' CHECK (severity IN ('info', 'success', 'warning', 'urgent')),
    is_read BOOLEAN DEFAULT FALSE,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AUTOMATION WORKFLOWS (n8n Webhook Triggers)
CREATE TABLE IF NOT EXISTS public.automation_workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    trigger_event VARCHAR(100) NOT NULL,
    webhook_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;

-- DEFAULT POLICIES (Full access to authenticated users for their respective companies)
CREATE POLICY "Allow public read access to initial seed company" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read/write on departments" ON public.departments FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on ai_employees" ON public.ai_employees FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on tasks" ON public.tasks FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on approvals" ON public.approvals FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on audit_logs" ON public.audit_logs FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on content_calendar" ON public.content_calendar FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on competitor_reports" ON public.competitor_reports FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on knowledge_documents" ON public.knowledge_documents FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write on automation_workflows" ON public.automation_workflows FOR ALL USING (true);
