import './App.css';
import ThemeSelector from './components/theme-selector';
import PlanningPokerContextProvider from './context/planning-poker-context-provider';
import PlanningPokerPage from './pages/planning-poker-page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeSelector>
          <PlanningPokerContextProvider>
            <PlanningPokerPage />
          </PlanningPokerContextProvider>
        </ThemeSelector>
      </header>
    </div>
  );
}

export default App;
