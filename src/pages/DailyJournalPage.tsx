import { useState } from 'react';
import { EntryList } from '../components/EntryList';
import { QuickAddForm } from '../components/QuickAddForm';
import { teamMembers, workEntries as seedEntries } from '../data/seed';
import { WorkEntry } from '../types';

export const DailyJournalPage = () => {
  const [entries, setEntries] = useState<WorkEntry[]>(seedEntries);

  const handleAddEntry = (entry: WorkEntry) => {
    setEntries([entry, ...entries]);
  };

  const planned = entries.filter((entry) => entry.status === 'Planned');
  const logged = entries.filter((entry) => entry.status === 'Done');
  const blockers = entries.filter((entry) => entry.type === 'Blocker');
  const decisions = entries.filter((entry) => entry.type === 'Decision');

  return (
    <div className="page-grid">
      <div className="column">
        <QuickAddForm onSubmit={handleAddEntry} />
        <section className="card">
          <div className="card-header">
            <h2>End of Day Prompt</h2>
            <span className="hint">Generate daily recap</span>
          </div>
          <ul className="prompt-list">
            <li>Biggest win</li>
            <li>Biggest blocker</li>
            <li>Plan for tomorrow</li>
          </ul>
          <button className="secondary" type="button">
            Draft Daily Recap
          </button>
        </section>
      </div>
      <div className="column">
        <EntryList title="Planned" entries={planned} members={teamMembers} />
        <EntryList title="Logged" entries={logged} members={teamMembers} />
        <EntryList title="Blockers" entries={blockers} members={teamMembers} />
        <EntryList title="Decisions" entries={decisions} members={teamMembers} />
      </div>
    </div>
  );
};
