import {
  CloseButton,
  MaximizeButton,
  MinimizeButton,
  Window,
  WindowTitle,
} from 'react-winplaza-98';
import Statistics from '../components/statistics/statistics';
import VotesList from '../components/votes-list';
import VotingForm from '../components/voting-form';
import { usePlanningStore } from '../store/use-planning-store';
import './planning-poker-page.scss';

const VotingPage = () => {
  const user = usePlanningStore((s) => s.currentUser);
  const isAdmin = usePlanningStore((s) => s.isAdmin);

  if (!user) {
    return null;
  }

  const { userName, team } = user;
  const isDevOrAdmin = team === 'Dev' || isAdmin;
  const isQAOrAdmin = team === 'QA' || isAdmin;

  return (
    <div className="content" style={{ color: '#eee' }}>
      <div style={{ display: 'flex' }}>
        <Window
          width={450}
          title={
            <WindowTitle title="Dev votes">
              <MinimizeButton />
              <MaximizeButton />
              <CloseButton />
            </WindowTitle>
          }
        >
          <div className="vote-section">
            {isDevOrAdmin && (
              <div className="user-section">
                <VotingForm team="Dev" />
                <VotesList team="Dev" username={userName} />
              </div>
            )}
            <div>
              <Statistics team="Dev" />
            </div>
          </div>
        </Window>
        <Window
          width={450}
          title={
            <WindowTitle title="QA votes">
              <MinimizeButton />
              <MaximizeButton />
              <CloseButton />
            </WindowTitle>
          }
        >
          <div className="vote-section">
            {isQAOrAdmin && (
              <div className="user-section">
                <VotingForm team="QA" />
                <VotesList team="QA" username={userName} />
              </div>
            )}
            <div>
              <Statistics team="QA" />
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};

export default VotingPage;
