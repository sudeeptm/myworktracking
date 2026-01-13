import { FiltersPanel } from '../components/FiltersPanel';
import { workEntries } from '../data/seed';

export const InsightsPage = () => {
  return (
    <div className="page-grid">
      <FiltersPanel />
      <section className="card">
        <div className="card-header">
          <h3>Natural Language Query</h3>
          <span className="hint">Summaries with citations</span>
        </div>
        <textarea
          rows={3}
          placeholder="Summarize the biggest wins from this week."
        />
        <div className="grid two">
          <label>
            Output format
            <select>
              <option>Bullets</option>
              <option>Narrative</option>
              <option>Table</option>
            </select>
          </label>
          <label>
            Evidence scope
            <select>
              <option>Team</option>
              <option>Me</option>
              <option>Project</option>
            </select>
          </label>
        </div>
        <button className="primary" type="button">
          Generate Summary
        </button>
      </section>
      <section className="card">
        <div className="card-header">
          <h3>Evidence Table</h3>
          <span className="hint">Links to entries</span>
        </div>
        <table className="evidence-table">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Type</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            {workEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.title}</td>
                <td>{entry.type}</td>
                <td>{entry.impactLevel} · {entry.impactType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
