import React from 'react';
import { Button } from 'react-winplaza-98';
import useFirestoreCollection from '../../hooks/use-firestore-collection';
import usePokerConfig from '../../hooks/use-poker-config';

const VoteController = ({ team }: { team: 'Dev' | 'QA' }) => {
  const [votes, { deleteDoc }] = useFirestoreCollection(`${team}votes`);
  const [config, setConfig] = usePokerConfig(team);

  const handleClear = () => {
    votes.forEach((vote) => {
      deleteDoc(vote.id);
    });
    setConfig({
      showVotes: false,
      canVote: true,
    });
  };

  const handleShow = () => {
    setConfig({
      showVotes: true,
      canVote: false,
    });
  };

  return (
    <div className="vote-controller">
      <Button onClick={handleClear} disabled={config?.canVote}>
        Clear votes
      </Button>
      <Button onClick={handleShow} disabled={config?.showVotes}>
        Show votes
      </Button>
    </div>
  );
};

export default VoteController;
