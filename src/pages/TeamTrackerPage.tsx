import { teamMembers, workEntries } from '../data/seed';

export const TeamTrackerPage = () => {
  return (
    <div className="page-grid">
      <section className="card">
        <div className="card-header">
          <h2>Team Dashboard</h2>
          <span className="hint">Weekly/monthly summaries</span>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article key={member.id} className="team-card">
              <h3>{member.name}</h3>
              <p className="entry-meta">{member.role} · {member.team}</p>
              <p>{member.strengths}</p>
              <p className="hint">Goal: {member.goals}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="card">
        <div className="card-header">
          <h3>Weekly Highlights</h3>
          <span className="hint">By person & project</span>
        </div>
        <ul className="summary-list">
          {workEntries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.title}</strong> — {entry.type} ({entry.id})
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <div className="card-header">
          <h3>Quick Kudos</h3>
          <span className="hint">Capture feedback fast</span>
        </div>
        <textarea rows={3} placeholder="Send a quick kudos or feedback" />
        <button className="primary" type="button">
          Send
        </button>
      </section>
    </div>
  );
};
