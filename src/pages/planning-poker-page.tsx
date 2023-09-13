import React, { useState } from 'react';
import {
  Checkbox,
  CloseButton,
  MaximizeButton,
  MinimizeButton,
  TextBox,
  Window,
  WindowTitle,
} from 'react-winplaza-98';
import Statistics from '../components/statistics/statistics';
import VotesList from '../components/votes-list';
import VotingForm from '../components/voting-form';
import './planning-poker-page.scss';

const PlanningPokerPage = () => {
  const [userSelected, setUserSelected] = useState(false);
  const [username, setUsername] = useState('');
  const [team, setTeam] = useState<'Dev' | 'QA'>('Dev');

  return (
    <div className="content">
      <select
        value={team}
        disabled={userSelected}
        onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => {
          setTeam(event.currentTarget.value === 'Dev' ? 'Dev' : 'QA');
        }}
      >
        <option>Dev</option>
        <option>QA</option>
      </select>
      <div className="user-form" style={{ color: '#eee' }}>
        <TextBox
          id="username"
          label="Name"
          disabled={userSelected}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        {username !== '' && (
          <Checkbox
            id="userSelected"
            label="Select username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserSelected(e.target.checked)
            }
            checked={userSelected}
          />
        )}
      </div>
      {userSelected && (
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
                  <VotingForm team={team} username={username} />
                  <VotesList team={team} username={username} />
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
                  <VotingForm team={team} username={username} />
                  <VotesList team={team} username={username} />
                </div>
              )}
              <div>
                <Statistics team={'QA'} />
              </div>
            </div>
          </Window>
        </div>
      )}
    </div>
  );
};

export default PlanningPokerPage;
