import { useContext } from 'react';
import { PlanningPokerContext } from './planning-poker-context-provider';

export function usePlanningPokerContext() {
  const ctx = useContext(PlanningPokerContext);

  if (!ctx) {
    throw new Error(
      'usePlanningPokerContext must be used within a PlanningPokerContextProvider'
    );
  }

  return ctx;
}
