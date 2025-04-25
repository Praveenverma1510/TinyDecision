import { motion } from 'framer-motion';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-xl"
    >
      <div className="mx-auto w-48 h-48 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-6">
        <svg
          className="h-24 w-24 text-indigo-500 dark:text-indigo-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M9 16h6M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">No Decisions Yet</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        Start documenting your important decisions to reflect and learn from them.
      </p>
      <motion.button
        onClick={() => document.querySelector('input#title').focus()}
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors inline-flex items-center text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        New Decision
      </motion.button>
    </motion.div>
  );
}