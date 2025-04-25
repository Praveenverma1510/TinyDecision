import React from 'react';

const DecisionForm = ({ newDecision, setNewDecision, onAddDecision }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Log a New Decision</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Decision Title</label>
          <input
            type="text"
            value={newDecision.title}
            onChange={(e) =>
              setNewDecision({ ...newDecision, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="e.g., Move to US or stay in India?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Pros (optional)</label>
          <textarea
            value={newDecision.pros}
            onChange={(e) =>
              setNewDecision({ ...newDecision, pros: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="What are the benefits?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cons (optional)</label>
          <textarea
            value={newDecision.cons}
            onChange={(e) =>
              setNewDecision({ ...newDecision, cons: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="What are the drawbacks?"
          />
        </div>
        <button
          onClick={onAddDecision}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Decision
        </button>
      </div>
    </div>
  );
};

export default DecisionForm;