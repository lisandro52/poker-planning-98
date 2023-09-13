import React from 'react';
import { Button } from 'react-winplaza-98';
import usePokerConfig from '../hooks/use-poker-config';

interface VoteButtonsProps {
  onVote: (value: number) => void;
  team: 'Dev' | 'QA';
}

const valueRows = [
  [0.5, 1, 2, 3],
  [4, 5, 8, 13],
  ['?']
];

const VoteButtons = ({ onVote, team }: VoteButtonsProps) => {
  const [config] = usePokerConfig(team);

  if (!config?.canVote) {
    return null;
  }

  return (
    <div className="vote-buttons">
      {valueRows.map((row, i) => {
        return (
          <div key={`vote-row-${i}`} className={`vote-row-${i}`}>
            {row.map((value) => {
              return typeof value === 'string' ? (
                <Button key={value} onClick={() => onVote(-1)}>
                  ?
                </Button>
              ) : (
                <Button key={value} onClick={() => onVote(value)}>{`${value} ${
                  value === 1 ? 'point' : 'points'
                }`}</Button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default VoteButtons;
