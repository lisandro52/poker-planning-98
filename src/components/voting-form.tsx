import React, { useEffect } from 'react';
import useFirestoreCollection from '../hooks/use-firestore-collection';
import VoteButtons from './vote-buttons';
import VoteController from './vote-controller/vote-controller';
import './voting-form.scss';

interface VotingFormProps {
  team: 'QA' | 'Dev';
  username: string;
}

const VotingForm = ({ username, team }: VotingFormProps) => {
  const [votes, { setDoc, deleteDoc }] = useFirestoreCollection(`${team}votes`);

  const handleVote = (value: number) => {
    setDoc(username, { value });
  };

  useEffect(() => {
    if (votes.find((v) => v.id === username) === undefined) {
      setDoc(username, { value: 0 });
    }
  }, [setDoc, deleteDoc, username, votes]);

  return (
    <>
      <VoteController team={team} />
      <VoteButtons team={team} onVote={handleVote} />
    </>
  );
};

export default VotingForm;
