import { TeamMember, WorkEntry } from '../types';

interface EntryListProps {
  title: string;
  entries: WorkEntry[];
  members: TeamMember[];
}

export const EntryList = ({ title, entries, members }: EntryListProps) => {
  const memberLookup = Object.fromEntries(members.map((member) => [member.id, member]));

  return (
    <section className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className="hint">{entries.length} entries</span>
      </div>
      <div className="entry-list">
        {entries.map((entry) => (
          <article key={entry.id} className="entry">
            <div>
              <p className="entry-meta">
                {entry.type} · {entry.status} · {entry.visibility}
              </p>
              <h4>{entry.title}</h4>
              <p className="entry-owner">{memberLookup[entry.ownerId]?.name ?? 'Unknown'}</p>
              {entry.details && <p className="entry-details">{entry.details}</p>}
            </div>
            <div className="entry-tags">
              {entry.impactLevel && entry.impactType && (
                <span className="tag">{entry.impactLevel} · {entry.impactType}</span>
              )}
              {entry.tags.map((tag) => (
                <span key={tag} className="tag outline">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
