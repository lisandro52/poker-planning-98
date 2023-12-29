export const Events = {
  disconnectMe: 'disconnect_me',
  updateVotersList: 'update_voters_list',
  vote: 'vote',
  connectMe: 'connect_me',
  cleanVotes: 'clean_votes',
  showVotes: 'show_votes',
  updateConfig: 'update_config',
};

export let votersList = [];
const votesConfig = {
  Dev: {
    canVote: true,
    showVotes: false,
  },
  QA: {
    canVote: true,
    showVotes: false,
  },
};

export function onConnect(socket, io) {
  socket.on(Events.connectMe, ({ userName, team }) => {
    console.log('user connected', userName);
    if (!votersList.some((voter) => voter.userName === userName)) {
      votersList.push({ userName, vote: null, team });
    }
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onDisconnect(socket, io) {
  socket.on(Events.disconnectMe, ({ userName }) => {
    console.log('user disconnected', userName);
    votersList = votersList.filter((voter) => voter.userName !== userName);
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onVote(socket, io) {
  socket.on(Events.vote, ({ userName, vote }) => {
    console.log('vote', userName, vote);
    votersList = votersList.map((voter) =>
      voter.userName === userName ? { ...voter, vote } : voter
    );
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onCleanVotes(socket, io) {
  socket.on(Events.cleanVotes, () => {
    console.log('clean votes');
    votersList = votersList.map((voter) => ({ ...voter, vote: null }));
    console.log(votersList);
    votesConfig.Dev.canVote = true;
    votesConfig.QA.canVote = true;
    votesConfig.Dev.showVotes = false;
    votesConfig.QA.showVotes = false;
    io.emit(Events.updateConfig, votesConfig);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onShowVotes(socket, io) {
  socket.on(Events.showVotes, ({ team }) => {
    console.log('show votes', team);
    votesConfig[team].showVotes = true;
    votesConfig[team].canVote = false;
    io.emit(Events.updateConfig, votesConfig);
    io.emit(Events.showVotes, votesConfig);
  });
}
