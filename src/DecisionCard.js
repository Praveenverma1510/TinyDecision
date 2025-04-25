import React, { useState } from 'react';

const DecisionCard = ({ decision, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [finalChoice, setFinalChoice] = useState(decision.finalChoice || '');
  const [explanation, setExplanation] = useState(decision.explanation || '');
  const [reflection, setReflection] = useState(decision.reflection || '');
  const [isGoodDecision, setIsGoodDecision] = useState(decision.isGoodDecision || null);

  const handleToggleMade = () => {
    onUpdate({ ...decision, isMade: !decision.isMade });
    setIsEditing(decision.isMade);
  };

  const handleSave = () => {
    onUpdate({
      ...decision,
      finalChoice,
      explanation,
      reflection,
      isGoodDecision,
    });
    setIsEditing(false);
  };

  const formattedDate = decision.date && moment(decision.date).isValid()
    ? moment(decision?.date).format('MMMM D, YYYY')
    : 'Unknown Date';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{decision.title}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <p className="text-sm text-gray-600">{decision.isMade ? 'Completed' : 'Pending'}</p>
        </div>
        <button
          onClick={handleToggleMade}
          className={`px-3 py-1 rounded ${decision.isMade ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
        >
          {decision.isMade ? 'Reopen' : 'Mark as Made'}
        </button>
      </div>
      {decision.pros && (
        <div className="mt-2">
          <h4 className="font-medium">Pros:</h4>
          <p className="text-sm">{decision.pros}</p>
        </div>
      )}
      {decision.cons && (
        <div className="mt-2">
          <h4 className="font-medium">Cons:</h4>
          <p className="text-sm">{decision.cons}</p>
        </div>
      )}
      {decision.isMade && !isEditing && (
        <div className="mt-2">
          <h4 className="font-medium">Final Choice:</h4>
          <p className="text-sm">{decision.finalChoice}</p>
          {decision.explanation && (
            <>
              <h4 className="font-medium mt-2">Explanation:</h4>
              <p className="text-sm">{decision.explanation}</p>
            </>
          )}
          {decision.reflection && (
            <>
              <h4 className="font-medium mt-2">Reflection:</h4>
              <p className="text-sm">{decision.reflection}</p>
              <p className="text-sm mt-1">
                Outcome:{' '}
                <span
                  className={
                    decision.isGoodDecision ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {decision.isGoodDecision ? 'No Regrets' : 'Still Unsure'}
                </span>
              </p>
            </>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-blue-500 hover:underline"
          >
            Edit Decision
          </button>
        </div>
      )}
      {isEditing && (
        <div className="mt-4">
          <label className="block text-sm font-medium">Final Choice</label>
          <input
            type="text"
            value={finalChoice}
            onChange={(e) => setFinalChoice(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="block text-sm font-medium mt-2">Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="block text-sm font-medium mt-2">Reflection</label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="block text-sm font-medium mt-2">Was this a good decision?</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name={`good-decision-${decision.id}`}
                checked={isGoodDecision === true}
                onChange={() => setIsGoodDecision(true)}
              />{' '}
              No Regrets
            </label>
            <label>
              <input
                type="radio"
                name={`good-decision-${decision.id}`}
                checked={isGoodDecision === false}
                onChange={() => setIsGoodDecision(false)}
              />{' '}
              Still Unsure
            </label>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DecisionCard;