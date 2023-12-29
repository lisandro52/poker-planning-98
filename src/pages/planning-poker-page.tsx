import { usePlanningStore } from '../store/use-planning-store';
import LoginPage from './login-page';
import VotingPage from './voting-page';

const PlanningPokerPage = () => {
  const user = usePlanningStore((s) => s.currentUser);

  if (!user || !user.userName) {
    return <LoginPage />;
  }

  return <VotingPage />;
};

export default PlanningPokerPage;
