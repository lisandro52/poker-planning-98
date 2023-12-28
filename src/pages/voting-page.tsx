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
import { usePlanningPokerContext } from '../context/use-planning-poker-context';
import './planning-poker-page.scss';

const VotingPage = () => {
  const { user, voterList } = usePlanningPokerContext();
  console.log(voterList);
  const { userName, team } = user || { userName: '', team: '' };

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
            {team === 'Dev' && (
              <div className="user-section">
                <VotingForm team={team} username={userName} />
                <VotesList team={team} username={userName} />
              </div>
            )}
            <div>
              <Statistics team={'Dev'} />
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
            {team === 'QA' && (
              <div className="user-section">
                <VotingForm team={team} username={userName} />
                <VotesList team={team} username={userName} />
              </div>
            )}
            <div>
              <Statistics team={'QA'} />
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};

export default VotingPage;
