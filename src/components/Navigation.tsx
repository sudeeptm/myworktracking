interface NavigationProps {
  active: string;
  onChange: (value: string) => void;
}

const tabs = [
  { id: 'daily', label: 'Daily Journal' },
  { id: 'team', label: 'Team Tracker' },
  { id: 'insights', label: 'Insights & Query' },
  { id: 'reviews', label: 'Review Builder' }
];

export const Navigation = ({ active, onChange }: NavigationProps) => {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? 'active' : ''}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
