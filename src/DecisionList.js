import { useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from './EmptyState';
import DecisionItem from './DecisionItem';

function DecisionList({ decisions, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState('date');

  const sortedDecisions = [...decisions].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'status') {
      const statusOrder = { pending: 1, decided: 2, good: 3, regretted: 4 };
      const getStatus = (d) =>
        !d.isMade ? 'pending' : d.wasGoodDecision === true ? 'good' : d.wasGoodDecision === false ? 'regretted' : 'decided';
      return statusOrder[getStatus(a)] - statusOrder[getStatus(b)];
    }
    return 0;
  });

  if (sortedDecisions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <motion.select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </motion.select>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedDecisions.map((decision) => (
          <DecisionItem
            key={decision.id}
            decision={decision}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default DecisionList;