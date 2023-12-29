import { Button } from 'react-winplaza-98';
import { usePlanningStore } from '../../store/use-planning-store';

const VoteController = ({ team }: { team: 'Dev' | 'QA' }) => {
  const config = usePlanningStore((s) => s.config[team]);
  const showVotes = usePlanningStore((s) => s.showVotes);
  const clearVotes = usePlanningStore((s) => s.clearVotes);

  const handleClear = () => {
    clearVotes();
  };

  const handleShow = () => {
    showVotes(team);
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
