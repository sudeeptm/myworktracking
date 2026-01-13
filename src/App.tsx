import { useState } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { DailyJournalPage } from './pages/DailyJournalPage';
import { TeamTrackerPage } from './pages/TeamTrackerPage';
import { InsightsPage } from './pages/InsightsPage';
import { ReviewBuilderPage } from './pages/ReviewBuilderPage';

export const App = () => {
  const [active, setActive] = useState('daily');

  return (
    <Layout>
      <Navigation active={active} onChange={setActive} />
      <main>
        {active === 'daily' && <DailyJournalPage />}
        {active === 'team' && <TeamTrackerPage />}
        {active === 'insights' && <InsightsPage />}
        {active === 'reviews' && <ReviewBuilderPage />}
      </main>
    </Layout>
  );
};
