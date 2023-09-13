import React from 'react';
import '../table-styles.scss';
import useFirestoreCollection from '../../hooks/use-firestore-collection';
import usePokerConfig from '../../hooks/use-poker-config';
import './statistics.scss';

const Statistics = ({ team }: { team: 'Dev' | 'QA' }) => {
  const [votes] = useFirestoreCollection(`${team}votes`);
  const [config] = usePokerConfig(team);

  if (!config?.showVotes) {
    return null;
  }

  const positiveValues = votes.filter((v) => v.value > 0);

  const average =
    positiveValues.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0) / (positiveValues.length === 0 ? 1 : positiveValues.length);

  const groupedVotes = votes
    .filter((v) => v.value !== 0)
    .reduce((grouped, vote) => {
      const key = vote.value.toString();
      if (!grouped[key]) {
        grouped[key] = 0;
      }
      grouped[key]++;
      return grouped;
    }, {});

  return (
    <div className="statistics">
      <strong>Statistics</strong>
      <p>Average: {average}</p>
      <div className="divTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell">
              <strong>Points</strong>
            </div>
            <div className="divTableCell">
              <strong>Votes</strong>
            </div>
          </div>
          {Object.keys(groupedVotes).map((key) => (
            <div className="divTableRow" key={key}>
              <div className="divTableCell">{key === '-1' ? '?' : key}</div>
              <div className="divTableCell">{groupedVotes[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
