export type Voter = {
  userName: string;
  vote: number | null;
  team: string;
};

export const Events = {
  disconnectMe: 'disconnect_me',
  updateVotersList: 'update_voters_list',
  vote: 'vote',
  connectMe: 'connect_me',
  cleanVotes: 'clean_votes',
};
