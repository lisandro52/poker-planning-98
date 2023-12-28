import React from 'react';
import { usePlanningPokerContext } from '../context/use-planning-poker-context';
import LoginPage from './login-page';
import VotingPage from './voting-page';

const PlanningPokerPage = () => {
  const { user } = usePlanningPokerContext();
  console.log('if check', !user || !user.userName);
  if (!user || !user.userName) {
    return <LoginPage />;
  }

  return <VotingPage />;
};

export default PlanningPokerPage;
