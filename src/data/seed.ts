import { TeamMember, WorkEntry } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Avery Chen',
    role: 'Engineering Manager',
    team: 'Platform',
    strengths: 'System reliability, mentoring',
    goals: 'Launch Atlas reliability work'
  },
  {
    id: 'tm-2',
    name: 'Jordan Patel',
    role: 'Staff Engineer',
    team: 'Data',
    strengths: 'Database performance, experimentation',
    goals: 'Improve search latency'
  }
];

export const workEntries: WorkEntry[] = [
  {
    id: 'entry-1',
    entryDate: new Date().toISOString().split('T')[0],
    type: 'Accomplishment',
    title: 'Reduced API latency by 35%',
    details: 'Migrated caching layer and optimized DB queries for Atlas.',
    ownerId: 'tm-2',
    status: 'Done',
    visibility: 'Team',
    impactLevel: 'High',
    impactType: 'Reliability',
    tags: ['project:Atlas', 'system:API'],
    links: ['https://status.example.com/atlas']
  },
  {
    id: 'entry-2',
    entryDate: new Date().toISOString().split('T')[0],
    type: 'Decision',
    title: 'Adopted Postgres FTS for search',
    details: 'Simpler infra vs external search service.',
    ownerId: 'tm-1',
    status: 'Done',
    visibility: 'Org',
    impactLevel: 'Med',
    impactType: 'Velocity',
    tags: ['search', 'infra'],
    links: ['https://wiki.example.com/search-fts']
  },
  {
    id: 'entry-3',
    entryDate: new Date().toISOString().split('T')[0],
    type: 'Blocker',
    title: 'Deployment blocked by missing IAM permissions',
    details: 'Coordinated with IT to grant least-privilege.',
    ownerId: 'tm-1',
    status: 'InProgress',
    visibility: 'Team',
    impactLevel: 'Low',
    impactType: 'Risk',
    tags: ['security', 'release'],
    links: []
  }
];
