import { useState } from 'react';
import { format } from 'date-fns';
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiClock,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

function DecisionItem({ decision, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getStatus = () => {
    if (!decision.isDecided) {
      return {
        text: 'Pending',
        icon: <FiClock className="text-yellow-500" />,
        bg: 'bg-yellow-100',
        textColor: 'text-yellow-800',
      };
    }
    if (decision.wasGoodDecision === true) {
      return {
        text: 'Good Decision',
        icon: <FiCheck className="text-green-500" />,
        bg: 'bg-green-100',
        textColor: 'text-green-800',
      };
    }
    if (decision.wasGoodDecision === false) {
      return {
        text: 'Regretted',
        icon: <FiCheck className="text-red-500" />,
        bg: 'bg-red-100',
        textColor: 'text-red-800',
      };
    }
    return {
      text: 'Decided',
      icon: <FiCheck className="text-indigo-500" />,
      bg: 'bg-indigo-100',
      textColor: 'text-indigo-800',
    };
  };

  const status = getStatus();

  const EditModal = () => {
    const [formData, setFormData] = useState({ ...decision });

    const handleSave = () => {
      onEdit(formData);
      setIsEditModalOpen(false);
    };

    return (
      <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] flex flex-col"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Decision</h3>
    
        <div className="space-y-4 overflow-y-auto pr-2 max-h-[65vh]" id='hide-scrollbar'>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pros</label>
            <textarea
              value={formData.pros}
              onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cons</label>
            <textarea
              value={formData.cons}
              onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Decision Made?</label>
            <input
              type="checkbox"
              checked={formData.isDecided}
              onChange={(e) => setFormData({ ...formData, isDecided: e.target.checked })}
              className="mr-2"
            />
            <span className="text-gray-600 dark:text-gray-300">Yes</span>
          </div>
    
          {formData.isDecided && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Choice</label>
                <input
                  type="text"
                  value={formData.choice}
                  onChange={(e) => setFormData({ ...formData, choice: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Was it a good decision?</label>
                <select
                  value={formData.wasGoodDecision === null ? '' : formData.wasGoodDecision}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      wasGoodDecision: e.target.value === '' ? null : e.target.value === 'true',
                    })
                  }
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reflection</label>
                <textarea
                  value={formData.reflection}
                  onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>
            </>
          )}
        </div>
    
        {/* ✅ Sticky footer buttons */}
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    
    );
  };

  const DeleteModal = () => (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delete Decision</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete "{decision.title}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(decision.id);
              setIsDeleteModalOpen(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`border rounded-xl overflow-hidden ${status.bg} dark:${status.bg.replace('100', '900')} hover:shadow-xl transition-all duration-200`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{decision.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(decision.date), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.textColor} dark:${status.bg.replace('100', '900')} dark:${status.textColor.replace('800', '200')}`}
              >
                {status.icon}
                <span className="ml-1">{status.text}</span>
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
          </div>

          {isExpanded && (
            <div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {(decision.pros || decision.cons) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {decision.pros && (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                      <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Pros</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{decision.pros}</p>
                    </div>
                  )}
                  {decision.cons && (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-red-200 dark:border-red-700">
                      <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Cons</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{decision.cons}</p>
                    </div>
                  )}
                </div>
              )}

              {decision.isDecided && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">Outcome</h4>
                    <p className="font-medium text-gray-800 dark:text-white mb-1">Chose: {decision.choice}</p>
                    {decision.reason && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        <span className="font-medium">Reason:</span> {decision.reason}
                      </p>
                    )}
                    {decision.reflection && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <span className="font-medium">Reflection:</span> {decision.reflection}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-full transition-colors"
              aria-label="Edit decision"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-full transition-colors"
              aria-label="Delete decision"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteModal />}
    </>
  );
}

export default DecisionItem;
