# Personal + Team Work Journal — Product Spec

## 1) Product Requirements

### MVP

**Goal:** Enable fast entry capture (<60 seconds) and reliable review outputs with evidence.

* **User accounts & roles**
  * Admin/Owner (full access), Team Member (own entries), Viewer (read-only).
* **Work entry capture**
  * Quick add form with keyboard-first UX.
  * Required: type, title, date, owner, visibility.
  * Optional: details (markdown), tags, impact, links, duration, status.
* **Daily journal**
  * Today view: planned tasks, logged entries, blockers, decisions.
  * End-of-day prompts generate daily recap.
* **Team tracker**
  * Add entries for team members; members can add their own.
  * Weekly/monthly summaries by person and project.
* **Insights & query**
  * Structured filters (date range, person, project, tags, impact, type, status).
  * Natural-language query that only summarizes stored entries with citations.
* **Review builder**
  * Weekly/monthly/quarterly/yearly review with evidence list.
* **Export**
  * JSON + Markdown bundle, CSV for entries.
* **Audit**
  * created_at, updated_at, updated_by.

### V2 Roadmap

* **Integrations**: Slack/Calendar/Jira import.
* **Embeddings**: Semantic search with vector store.
* **Automated metrics**: velocity, impact trends, theme detection.
* **SSO**: OAuth for enterprise login.
* **Team dashboards**: additional visualization and export templates.

## 2) Wireframe-Level UI Description

### A) Daily Journal

**Screen: Daily Journal**

* **Quick Add Panel**
  * Type dropdown, title input, details editor, tags picker, impact selector, links, duration.
  * Keyboard shortcuts for type and status.
* **Today View**
  * Sections: Planned, Logged, Blockers, Decisions.
  * Inline edit for quick updates.
* **End of Day Modal**
  * Prompts: biggest win, biggest blocker, tomorrow plan.
  * Generates a daily recap card.

### B) Team Tracker

**Screen: Team Dashboard**

* Summary: accomplishments by week/month, project progress, contribution distribution.
* Filters for person/project/time.
* Quick Kudos/Feedback capture.

### C) Insights & Query

**Screen: Insights**

* Left: structured filters.
* Right: NL query input + output format selector (bullets/narrative/table).
* Evidence table with entry links.

### D) Review Builder

**Screen: Review Builder**

* Scope selector: Me / Team / Person / Project.
* Timeframe: week/month/quarter/year.
* Generate summary and evidence list.

## 3) Database Schema (Postgres)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','member','viewer')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  team TEXT,
  start_date DATE,
  strengths TEXT,
  goals TEXT
);

-- Projects/Initiatives
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES team_members(id),
  quarter TEXT,
  year INT,
  goals TEXT,
  success_metrics TEXT
);

-- Work Entries
CREATE TABLE work_entries (
  id UUID PRIMARY KEY,
  entry_date DATE NOT NULL,
  start_time TIME,
  duration_minutes INT,
  type TEXT NOT NULL CHECK (type IN ('Task','Accomplishment','Decision','Blocker','MeetingNote','Learning','Feedback','Kudos')),
  title TEXT NOT NULL,
  details TEXT,
  owner_id UUID REFERENCES team_members(id),
  status TEXT NOT NULL CHECK (status IN ('Planned','InProgress','Done','Dropped')),
  visibility TEXT NOT NULL CHECK (visibility IN ('Private','Team','Org')),
  impact_level TEXT CHECK (impact_level IN ('Low','Med','High')),
  impact_type TEXT CHECK (impact_type IN ('Revenue','Cost','Risk','Customer','Quality','Velocity','Reliability','Security','Culture')),
  impact_notes TEXT,
  links TEXT[],
  attachments TEXT[],
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES users(id)
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE work_entry_tags (
  work_entry_id UUID REFERENCES work_entries(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (work_entry_id, tag_id)
);

-- Review Artifacts
CREATE TABLE review_artifacts (
  id UUID PRIMARY KEY,
  scope_type TEXT NOT NULL CHECK (scope_type IN ('Me','Team','Person','Project')),
  scope_id UUID,
  timeframe TEXT NOT NULL,
  content TEXT NOT NULL,
  entry_ids UUID[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_work_entries_date ON work_entries(entry_date);
CREATE INDEX idx_work_entries_owner ON work_entries(owner_id);
CREATE INDEX idx_work_entries_type ON work_entries(type);
CREATE INDEX idx_work_entries_status ON work_entries(status);
CREATE INDEX idx_work_entries_impact_level ON work_entries(impact_level);
CREATE INDEX idx_work_entries_impact_type ON work_entries(impact_type);
CREATE INDEX idx_work_entries_fts ON work_entries USING GIN (to_tsvector('english', title || ' ' || coalesce(details,'')));
```

## 4) API Design (REST)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`

### Work Entries

* `GET /api/work-entries?from=&to=&owner=&tags=&type=&status=&impact_type=&impact_level=`
* `POST /api/work-entries`
* `GET /api/work-entries/:id`
* `PATCH /api/work-entries/:id`
* `DELETE /api/work-entries/:id`

### Team Members

* `GET /api/team-members`
* `POST /api/team-members`
* `PATCH /api/team-members/:id`
* `DELETE /api/team-members/:id`

### Projects

* `GET /api/projects`
* `POST /api/projects`
* `PATCH /api/projects/:id`
* `DELETE /api/projects/:id`

### Review Builder

* `POST /api/reviews/generate` (scope, timeframe, filters)
* `GET /api/reviews/:id`

### Exports

* `GET /api/exports/entries.csv`
* `GET /api/exports/bundle.json`
* `GET /api/exports/bundle.md`

## 5) Implementation Plan

### Phase 1: Foundations

* Repo scaffolding (Next.js + API routes)
* Database schema + migrations
* Authentication + roles

### Phase 2: Core Capture

* Work entry CRUD
* Daily Journal UI
* Team members CRUD

### Phase 3: Insights & Reviews

* Filters + search
* Review builder + evidence list

### Phase 4: Exports + Polish

* CSV/Markdown/JSON export
* Performance tuning + indexing

## 6) Prompt Templates

### Daily Recap

```
Summarize today's work entries in 5 bullets. Include biggest win, biggest blocker, and plan for tomorrow. Cite entry IDs after each bullet.
```

### Weekly Summary

```
Create a weekly summary with 5-8 bullets. Include accomplishments, decisions, and blockers. Provide evidence list with entry IDs.
```

### Monthly Recap

```
Write a narrative recap of this month. Highlight impact by type and level. Provide a table of evidence with entry IDs and links.
```

### Quarterly Highlights

```
Generate quarterly highlights (wins, metrics, risks mitigated, learnings). Include evidence list referencing entry IDs.
```

### Year-End Review (Me + Team)

```
Draft a year-end review with sections: Highlights, Impact Metrics, Challenges & Resolutions, Learnings, Next Goals. Use only stored entries and cite entry IDs.
```

## 7) Example Entries & Outputs

### Example Work Entries

1. **Accomplishment** — "Reduced API latency by 35%"
   * Impact: High, Reliability
   * Tags: project:Atlas, system:API
   * Details: Migrated caching layer and optimized DB queries.

2. **Decision** — "Adopted Postgres FTS for search"
   * Impact: Med, Velocity
   * Details: Simpler infra vs external search service.

3. **Blocker** — "Deployment blocked by missing IAM permissions"
   * Impact: Low, Risk
   * Details: Coordinated with IT to grant least-privilege.

### Example Weekly Summary Output (bullets)

* Reduced API latency by 35% via caching + query tuning. (Entry: 1)
* Adopted Postgres FTS to streamline search infrastructure. (Entry: 2)
* Resolved deployment blocker by securing IAM permissions. (Entry: 3)

## 8) Tech Choices & Repo Structure

### Recommended Stack

* **Frontend**: React + TypeScript
* **Backend**: Next.js API routes
* **DB**: Postgres (SQLite for local-first)
* **Search**: Postgres FTS (optional embeddings)

### Hosting Options

* **Self-host**: Docker Compose (app + db)
* **Cloud**: Vercel/Fly/Render for app + managed Postgres

### Repo Structure

```
app/
  api/
  components/
  pages/
  styles/
prisma/
  schema.prisma
  migrations/
seed/
  seed.ts
docker-compose.yml
.env.example
```
