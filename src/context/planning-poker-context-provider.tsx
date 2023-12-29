import React, { useEffect } from 'react';
import { socket } from '../socket';
import { usePlanningStore } from '../store/use-planning-store';
import { Events, Voter } from '../types/vote-types';

interface Props {
  children: React.ReactNode;
}

const PlanningPokerContextProvider = ({ children }: Props) => {
  const updateVotersList = usePlanningStore((s) => s.updateVoterList);
  const updateConfig = usePlanningStore((s) => s.updateConfig);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onUpdateVotersList(list: Voter[]) {
      updateVotersList(list);
    }

    function onUpdateConfig(config: any) {
      updateConfig(config);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(Events.updateVotersList, onUpdateVotersList);
    socket.on(Events.updateConfig, onUpdateConfig);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(Events.updateVotersList, onUpdateVotersList);
      socket.off(Events.updateConfig, onUpdateConfig);
    };
  }, [updateConfig, updateVotersList]);

  return <>{children}</>;
};

export default PlanningPokerContextProvider;
