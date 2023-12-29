import { create } from 'zustand';
import { ConfigSlice, createConfigSlice } from './config-slice';
import { VotesSlice, createVotesSlice } from './votes-slice';

export const usePlanningStore = create<ConfigSlice & VotesSlice>()((...a) => ({
  ...createConfigSlice(...a),
  ...createVotesSlice(...a),
}));
