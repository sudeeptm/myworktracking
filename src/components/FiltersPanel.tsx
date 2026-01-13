export const FiltersPanel = () => {
  return (
    <section className="card filters">
      <div className="card-header">
        <h3>Structured Filters</h3>
        <span className="hint">Evidence-backed summaries</span>
      </div>
      <div className="grid two">
        <label>
          Date Range
          <input type="text" placeholder="2024-01-01 → 2024-01-31" />
        </label>
        <label>
          Person
          <input type="text" placeholder="Avery Chen" />
        </label>
        <label>
          Project
          <input type="text" placeholder="Atlas" />
        </label>
        <label>
          Tags
          <input type="text" placeholder="search, reliability" />
        </label>
        <label>
          Impact
          <input type="text" placeholder="High, Reliability" />
        </label>
        <label>
          Status
          <input type="text" placeholder="Done" />
        </label>
      </div>
    </section>
  );
};
