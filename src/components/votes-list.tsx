import React from 'react';
import useFirestoreCollection from '../hooks/use-firestore-collection';
import usePokerConfig from '../hooks/use-poker-config';
import './table-styles.scss';

interface VotesListProps {
  username: string;
  team: 'Dev' | 'QA';
}

const VotesList = ({ username, team }: VotesListProps) => {
  const [votes] = useFirestoreCollection(`${team}votes`);
  const [config] = usePokerConfig(team);

  if (!config) {
    return null;
  }

  const getVoteView = (id: string, value: number) => {
    if (config.showVotes) {
      return value > -1 ? value : '?';
    } else {
      if (id === username) {
        return value > -1 ? value : '?';
      } else {
        return '\u25AE';
      }
    }
  };

  return (
    <div className="votes-list" style={{ marginTop: 15 }}>
      <div className="divTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell">
              <strong>Player</strong>
            </div>
            <div className="divTableCell">
              <strong>Points</strong>
            </div>
          </div>
          {votes.map((vote) => (
            <div className="divTableRow" key={vote.id}>
              <div className="divTableCell">{`${
                vote.value !== 0 ? '\u2713' : ''
              }${vote.id}`}</div>
              <div className="divTableCell">
                {getVoteView(vote.id, vote.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotesList;
