export type Role = 'admin' | 'member' | 'viewer';

export type EntryType =
  | 'Task'
  | 'Accomplishment'
  | 'Decision'
  | 'Blocker'
  | 'MeetingNote'
  | 'Learning'
  | 'Feedback'
  | 'Kudos';

export type EntryStatus = 'Planned' | 'InProgress' | 'Done' | 'Dropped';
export type Visibility = 'Private' | 'Team' | 'Org';
export type ImpactLevel = 'Low' | 'Med' | 'High';
export type ImpactType =
  | 'Revenue'
  | 'Cost'
  | 'Risk'
  | 'Customer'
  | 'Quality'
  | 'Velocity'
  | 'Reliability'
  | 'Security'
  | 'Culture';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: string;
  strengths?: string;
  goals?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId?: string;
  quarter?: string;
  year?: number;
}

export interface WorkEntry {
  id: string;
  entryDate: string;
  type: EntryType;
  title: string;
  details?: string;
  ownerId: string;
  status: EntryStatus;
  visibility: Visibility;
  impactLevel?: ImpactLevel;
  impactType?: ImpactType;
  tags: string[];
  links: string[];
  durationMinutes?: number;
}

export interface ReviewArtifact {
  id: string;
  scopeType: 'Me' | 'Team' | 'Person' | 'Project';
  scopeId?: string;
  timeframe: string;
  content: string;
  entryIds: string[];
}
