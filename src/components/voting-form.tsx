import { usePlanningStore } from '../store/use-planning-store';
import VoteButtons from './vote-buttons';
import VoteController from './vote-controller/vote-controller';
import './voting-form.scss';

interface VotingFormProps {
  team: 'QA' | 'Dev';
}

const VotingForm = ({ team }: VotingFormProps) => {
  const vote = usePlanningStore((s) => s.vote);
  const isAdmin = usePlanningStore((s) => s.isAdmin);

  return (
    <>
      {isAdmin && <VoteController team={team} />}
      <VoteButtons team={team} onVote={vote} />
    </>
  );
};

export default VotingForm;
