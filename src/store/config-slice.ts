import { StateCreator } from 'zustand';
import { Events, Team } from '../types/vote-types';
import { socket } from '../socket';

export interface ConfigSlice {
  config: {
    [key in Team]: {
      canVote: boolean;
      showVotes: boolean;
    };
  };
  showVotes: (team: Team) => void;
  updateConfig: (config: ConfigSlice['config']) => void;
}

export const createConfigSlice: StateCreator<
  ConfigSlice,
  [],
  [],
  ConfigSlice
> = (set) => ({
  config: {
    Dev: {
      canVote: true,
      showVotes: false,
    },
    QA: {
      canVote: true,
      showVotes: false,
    },
  },
  showVotes: (team) => {
    socket.emit(Events.showVotes, { team });
    // set((state) => ({
    //   [team]: {
    //     ...state.config[team],
    //     showVotes: true,
    //     canVote: false,
    //   },
    // }));
  },
  updateConfig: (config) => set({ config }),
});
