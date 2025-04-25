import React, { useState, useEffect } from 'react';
import DecisionForm from './DecisionForm';
import DecisionList from './DecisionList';
import { FiSun, FiMoon } from 'react-icons/fi';

const App = () => {
  const [decisions, setDecisions] = useState([]);
  const [newDecision, setNewDecision] = useState({
    title: '',
    pros: '',
    cons: '',
    isMade: false,
  });
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDecisions = JSON.parse(localStorage.getItem('decisions') || '[]');
    setDecisions(storedDecisions);
  }, []);

  useEffect(() => {
    localStorage.setItem('decisions', JSON.stringify(decisions));
  }, [decisions]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleAddDecision = () => {
    if (!newDecision.title.trim()) return;
    const decision = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...newDecision,
    };
    setDecisions([decision, ...decisions]);
    setNewDecision({ title: '', pros: '', cons: '', isMade: false });
  };

  const handleUpdateDecision = (updatedDecision) => {
    setDecisions(decisions.map((d) => (d.id === updatedDecision.id ? updatedDecision : d)));
  };

  const handleDeleteDecision = (id) => {
    setDecisions(decisions.filter((d) => d.id !== id));
  };

  const filteredDecisions = decisions.filter((decision) => {
    switch (filter) {
      case 'pending':
        return !decision.isDecided;
      case 'decided':
        return decision.isDecided;
      case 'good':
        return decision.wasGoodDecision === true;
      case 'regretted':
        return decision.wasGoodDecision === false;
      default:
        return true;
    }
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tiny Decisions</h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
          </button>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <DecisionForm
            newDecision={newDecision}
            setNewDecision={setNewDecision}
            onAddDecision={handleAddDecision}
          />
          <DecisionList
            decisions={filteredDecisions}
            onEdit={handleUpdateDecision}
            onDelete={handleDeleteDecision}
          />
        </main>

        {/* 🧠 Sidebar Filters */}
        <aside className="hidden md:block w-64">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
            <div className="space-y-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Pending', value: 'pending' },
                { label: 'Decided', value: 'decided' },
                { label: 'Good Decisions', value: 'good' },
                { label: 'Regretted', value: 'regretted' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    filter === opt.value
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
