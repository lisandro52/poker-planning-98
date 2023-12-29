import { usePlanningStore } from '../store/use-planning-store';
import './table-styles.scss';

interface VotesListProps {
  username: string;
  team: 'Dev' | 'QA';
}

const VotesList = ({ username, team }: VotesListProps) => {
  const votes = usePlanningStore((s) =>
    s.voterList.filter((v) => v.team === team)
  );
  const config = usePlanningStore((s) => s.config[team]);

  const getVoteView = (id: string, value: number | null) => {
    if (config.showVotes) {
      return value !== null && value > -1 ? value : '?';
    } else {
      if (id === username) {
        return value !== null && value > -1 ? value : '?';
      } else {
        return '\u25AE';
      }
    }
  };

  return (
    <div className="votes-list" style={{ marginTop: 15, color: 'black' }}>
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
          {votes.map((v) => (
            <div className="divTableRow" key={v.userName}>
              <div className="divTableCell">{`${
                (v.vote ?? -1) > 0 ? '\u2713' : ''
              }${v.userName}`}</div>
              <div className="divTableCell">
                {getVoteView(v.userName, v.vote)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotesList;
