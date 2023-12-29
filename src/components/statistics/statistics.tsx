import { usePlanningStore } from '../../store/use-planning-store';
import '../table-styles.scss';
import './statistics.scss';

const Statistics = ({ team }: { team: 'Dev' | 'QA' }) => {
  const votes = usePlanningStore((s) =>
    s.voterList.filter((v) => v.team === team)
  );
  const config = usePlanningStore((s) => s.config[team]);

  if (!config?.showVotes) {
    return null;
  }

  const positiveValues = votes.filter((v) => (v.vote ?? 0) > 0);

  const average =
    positiveValues.reduce((prev, curr) => {
      return prev + (curr.vote ?? 0);
    }, 0) / (positiveValues.length === 0 ? 1 : positiveValues.length);

  const groupedVotes = votes
    .filter((v) => v.vote !== 0 && v.vote !== null)
    .reduce((grouped, v) => {
      const key = v.vote!.toString();
      if (!grouped[key]) {
        grouped[key] = 0;
      }
      grouped[key]++;
      return grouped;
    }, {} as { [key: string]: number });

  return (
    <div className="statistics" style={{ color: 'black' }}>
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
