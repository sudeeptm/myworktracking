import { useState } from 'react';
import { EntryStatus, EntryType, ImpactLevel, ImpactType, Visibility, WorkEntry } from '../types';
import { teamMembers } from '../data/seed';

interface QuickAddFormProps {
  onSubmit: (entry: WorkEntry) => void;
}

const entryTypes: EntryType[] = [
  'Task',
  'Accomplishment',
  'Decision',
  'Blocker',
  'MeetingNote',
  'Learning',
  'Feedback',
  'Kudos'
];

const statuses: EntryStatus[] = ['Planned', 'InProgress', 'Done', 'Dropped'];
const visibilities: Visibility[] = ['Private', 'Team', 'Org'];
const impactLevels: ImpactLevel[] = ['Low', 'Med', 'High'];
const impactTypes: ImpactType[] = [
  'Revenue',
  'Cost',
  'Risk',
  'Customer',
  'Quality',
  'Velocity',
  'Reliability',
  'Security',
  'Culture'
];

export const QuickAddForm = ({ onSubmit }: QuickAddFormProps) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [type, setType] = useState<EntryType>('Task');
  const [status, setStatus] = useState<EntryStatus>('Planned');
  const [visibility, setVisibility] = useState<Visibility>('Team');
  const [ownerId, setOwnerId] = useState(teamMembers[0]?.id ?? '');
  const [impactLevel, setImpactLevel] = useState<ImpactLevel>('Med');
  const [impactType, setImpactType] = useState<ImpactType>('Velocity');
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const entry: WorkEntry = {
      id: `entry-${Date.now()}`,
      entryDate: new Date().toISOString().split('T')[0],
      type,
      title: title.trim(),
      details: details.trim() || undefined,
      ownerId,
      status,
      visibility,
      impactLevel,
      impactType,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      links: links.split(',').map((link) => link.trim()).filter(Boolean),
      durationMinutes: durationMinutes ? Number(durationMinutes) : undefined
    };

    onSubmit(entry);
    setTitle('');
    setDetails('');
    setTags('');
    setLinks('');
    setDurationMinutes('');
    setStatus('Planned');
    setType('Task');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2>Quick Add</h2>
        <span className="hint">Keyboard-first capture</span>
      </div>
      <div className="grid two">
        <label>
          Type
          <select value={type} onChange={(event) => setType(event.target.value as EntryType)}>
            {entryTypes.map((entryType) => (
              <option key={entryType} value={entryType}>
                {entryType}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as EntryStatus)}>
            {statuses.map((entryStatus) => (
              <option key={entryStatus} value={entryStatus}>
                {entryStatus}
              </option>
            ))}
          </select>
        </label>
        <label>
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Short title" />
        </label>
        <label>
          Owner
          <select value={ownerId} onChange={(event) => setOwnerId(event.target.value)}>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Visibility
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as Visibility)}
          >
            {visibilities.map((entryVisibility) => (
              <option key={entryVisibility} value={entryVisibility}>
                {entryVisibility}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input type="date" value={new Date().toISOString().split('T')[0]} readOnly />
        </label>
      </div>
      <label>
        Details (Markdown supported)
        <textarea
          rows={3}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Add context, impact, or outcomes"
        />
      </label>
      <div className="grid three">
        <label>
          Impact Level
          <select
            value={impactLevel}
            onChange={(event) => setImpactLevel(event.target.value as ImpactLevel)}
          >
            {impactLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          Impact Type
          <select value={impactType} onChange={(event) => setImpactType(event.target.value as ImpactType)}>
            {impactTypes.map((impact) => (
              <option key={impact} value={impact}>
                {impact}
              </option>
            ))}
          </select>
        </label>
        <label>
          Duration (mins)
          <input
            type="number"
            min="0"
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(event.target.value)}
          />
        </label>
      </div>
      <div className="grid two">
        <label>
          Tags
          <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="project:Atlas, system:API" />
        </label>
        <label>
          Links
          <input value={links} onChange={(event) => setLinks(event.target.value)} placeholder="https://..." />
        </label>
      </div>
      <button className="primary" type="submit">
        Add Entry
      </button>
    </form>
  );
};
