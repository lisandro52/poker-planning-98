export type Team = 'Dev' | 'QA';

export type Voter = {
  userName: string;
  vote: number | null;
  team: Team;
};

export const Events = {
  disconnectMe: 'disconnect_me',
  updateVotersList: 'update_voters_list',
  vote: 'vote',
  connectMe: 'connect_me',
  clearVotes: 'clean_votes',
  showVotes: 'show_votes',
  updateConfig: 'update_config',
};
