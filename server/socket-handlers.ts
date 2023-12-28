import { Server, Socket } from 'socket.io';

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

export let votersList: Voter[] = [];

export function onConnect(socket: Socket, io: Server) {
  socket.on(Events.connectMe, ({ userName, team }) => {
    console.log('user connected', userName);
    if (!votersList.some((voter) => voter.userName === userName)) {
      votersList.push({ userName, vote: null, team });
    }
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onDisconnect(socket: Socket, io: Server) {
  socket.on(Events.disconnectMe, ({ userName }) => {
    console.log('user disconnected', userName);
    votersList = votersList.filter((voter) => voter.userName !== userName);
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onVote(socket: Socket, io: Server) {
  socket.on(Events.vote, ({ userName, vote }) => {
    console.log('vote', userName, vote);
    votersList = votersList.map((voter) =>
      voter.userName === userName ? { ...voter, vote } : voter
    );
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}

export function onCleanVotes(socket: Socket, io: Server) {
  socket.on(Events.cleanVotes, () => {
    console.log('clean votes');
    votersList = votersList.map((voter) => ({ ...voter, vote: null }));
    console.log(votersList);
    io.emit(Events.updateVotersList, votersList);
  });
}
