import React, { useState } from 'react';
import { Button, TextBox } from 'react-winplaza-98';
import { usePlanningPokerContext } from '../context/use-planning-poker-context';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [team, setTeam] = useState<'Dev' | 'QA'>('Dev');
  const { connect } = usePlanningPokerContext();

  return (
    <div className="content" style={{ color: '#eee' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="team">Select a Team</label>
        <select
          id="team"
          value={team}
          onChange={(event: React.SyntheticEvent<HTMLSelectElement>) => {
            setTeam(event.currentTarget.value === 'Dev' ? 'Dev' : 'QA');
          }}
        >
          <option>Dev</option>
          <option>QA</option>
        </select>
        <div className="user-form">
          <TextBox
            id="username"
            label="Name"
            stacked
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <Button
          disabled={!userName}
          onClick={() => {
            connect({ userName, team });
          }}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
