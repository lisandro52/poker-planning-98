import React, { createContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../socket';
import { Events, Voter } from '../types/vote-types';

export type Team = 'Dev' | 'QA';

export interface IPlanningPokerContext {
  voterList: Voter[];
  user: Voter | null;
  setList: (list: Voter[]) => void;
  connect: ({ userName, team }: { userName: string; team: string }) => void;
  disconnect: ({ userName }: { userName: string }) => void;
  socket: Socket;
}

const connect = ({ userName, team }: { userName: string; team: string }) => {
  socket.connect();
  socket.emit(Events.connectMe, { userName, team });
};
const disconnect = ({ userName }: { userName: string }) => {
  socket.emit(Events.disconnectMe, { userName });
  socket.disconnect();
};

export const PlanningPokerContext = createContext<IPlanningPokerContext>({
  user: null,
  voterList: [],
  setList: () => {},
  connect: () => {},
  disconnect: () => {},
  socket,
});

interface Props {
  children: React.ReactNode;
}

const PlanningPokerContextProvider = ({ children }: Props) => {
  const [voterList, setVoterList] = useState([] as Voter[]);
  const [user, setUser] = useState<Voter | null>(null);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(Events.updateVotersList, (data: Voter[]) => {
      setVoterList(data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <PlanningPokerContext.Provider
      value={{
        user,
        voterList,
        setList: setVoterList,
        socket,
        connect: (data) => {
          setUser({ userName: data.userName, team: data.team, vote: null });
          connect(data);
        },
        disconnect,
      }}
    >
      {children}
    </PlanningPokerContext.Provider>
  );
};

export default PlanningPokerContextProvider;
