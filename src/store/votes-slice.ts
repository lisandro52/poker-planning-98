import { StateCreator } from 'zustand';
import { socket } from '../socket';
import { Events, Voter } from '../types/vote-types';
import { ConfigSlice } from './config-slice';

export interface VotesSlice {
  voterList: Voter[];
  currentUser: Voter | null;
  isAdmin: boolean;
  updateVoterList: (voterList: Voter[]) => void;
  connectMe: ({ userName, team }: Voter) => void;
  disconnectMe: () => void;
  vote: (vote: number | null) => void;
  clearVotes: () => void;
}

export const createVotesSlice: StateCreator<
  ConfigSlice & VotesSlice,
  [],
  [],
  VotesSlice
> = (set, get) => ({
  voterList: [],
  currentUser: null,
  isAdmin: false,
  updateVoterList: (voterList) => set({ voterList }),
  connectMe: ({ userName, team }) => {
    socket.connect();
    socket.emit(Events.connectMe, { userName, team });
    set((state) => ({
      ...state,
      isAdmin: userName === 'Eze',
      currentUser: {
        userName,
        team,
        vote: null,
      },
    }));
  },
  disconnectMe: () => {
    socket.emit(Events.disconnectMe, {
      userName: get().currentUser!.userName,
    });
    socket.disconnect();
    set((state) => ({
      ...state,
      currentUser: null,
    }));
  },
  vote: (vote) => {
    socket.emit(Events.vote, {
      userName: get().currentUser!.userName,
      vote,
    });
    set((state) => ({
      ...state,
      currentUser: {
        ...state.currentUser!,
        vote,
      },
    }));
  },
  clearVotes: () => {
    socket.emit(Events.clearVotes);
    set((state) => ({
      currentUser: {
        ...state.currentUser!,
        vote: null,
      },
    }));
  },
});
