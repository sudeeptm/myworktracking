import { ReactNode } from 'react';
import '../styles/main.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal + Team Work Journal</p>
          <h1>Work Journal</h1>
          <p className="subtitle">
            Capture daily work, track team progress, and generate evidence-backed reviews.
          </p>
        </div>
        <div className="badge">MVP Workspace</div>
      </header>
      {children}
    </div>
  );
};
