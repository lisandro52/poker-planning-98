import React from 'react';
import './App.css';
import ThemeSelector from './components/theme-selector';
import PlanningPokerPage from './pages/planning-poker-page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeSelector>
          <PlanningPokerPage />
          {/* <Window
            title={
              <WindowTitle title="A window title">
                <MinimizeButton />
                <MaximizeButton />
                <CloseButton />
              </WindowTitle>
            }
            statusBar={
              <WindowStatusBar>
                <StatusBarField>Press F12 for help</StatusBarField>
                <StatusBarField>Slide 1</StatusBarField>
                <StatusBarField>CPU Usage: 14%</StatusBarField>
              </WindowStatusBar>
            }
            width={300}
          >
            <p> There are just so many possibilities:</p>
            <ul>
              <li>A Task Manager</li>
              <li>A Notepad</li>
              <li>Or even a File Explorer!</li>
            </ul>
          </Window> */}
        </ThemeSelector>
      </header>
    </div>
  );
}

export default App;
