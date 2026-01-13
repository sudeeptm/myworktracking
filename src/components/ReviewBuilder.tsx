import { useState } from 'react';
import { ReviewArtifact, WorkEntry } from '../types';

interface ReviewBuilderProps {
  entries: WorkEntry[];
  onGenerate: (review: ReviewArtifact) => void;
}

const promptTemplates = {
  weekly: 'Create a weekly summary with 5-8 bullets. Include accomplishments, decisions, and blockers.',
  monthly: 'Write a narrative recap of this month. Highlight impact by type and level.',
  quarterly: 'Generate quarterly highlights (wins, metrics, risks mitigated, learnings).',
  yearly: 'Draft a year-end review with sections: Highlights, Impact Metrics, Challenges & Resolutions.'
};

export const ReviewBuilder = ({ entries, onGenerate }: ReviewBuilderProps) => {
  const [scopeType, setScopeType] = useState<ReviewArtifact['scopeType']>('Team');
  const [timeframe, setTimeframe] = useState('Weekly');
  const [notes, setNotes] = useState('');

  const handleGenerate = () => {
    const selectedEntries = entries.slice(0, 3);
    const content = `${promptTemplates.weekly}\n\nSummary: ${notes || 'Drafted summary using stored entries.'}`;

    onGenerate({
      id: `review-${Date.now()}`,
      scopeType,
      timeframe,
      content,
      entryIds: selectedEntries.map((entry) => entry.id)
    });
  };

  return (
    <section className="card">
      <div className="card-header">
        <h3>Review Builder</h3>
        <span className="hint">Weekly / Monthly / Quarterly / Yearly</span>
      </div>
      <div className="grid two">
        <label>
          Scope
          <select value={scopeType} onChange={(event) => setScopeType(event.target.value as ReviewArtifact['scopeType'])}>
            <option value="Me">Me</option>
            <option value="Team">Team</option>
            <option value="Person">Person</option>
            <option value="Project">Project</option>
          </select>
        </label>
        <label>
          Timeframe
          <select value={timeframe} onChange={(event) => setTimeframe(event.target.value)}>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </label>
      </div>
      <label>
        Notes / Guidance
        <textarea
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add key themes or reminders"
        />
      </label>
      <button className="primary" type="button" onClick={handleGenerate}>
        Generate Review
      </button>
    </section>
  );
};
