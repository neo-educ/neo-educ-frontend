import React, { useState } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ClassPlanCreate } from '../../types';

interface CreateClassPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClassPlanCreate) => void;
  teacherEmail: string;
}

const CreateClassPlanModal: React.FC<CreateClassPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  teacherEmail
}) => {
  const [formData, setFormData] = useState<ClassPlanCreate>({
    topic: '',
    classDate: new Date(),
    inputData: '',
    teacher_email: teacherEmail
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Class Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="classDate" className="block text-sm font-medium text-gray-700">
              Class Date and Time
            </label>
            <DatePicker
              selected={formData.classDate}
              onChange={(date) => setFormData({ ...formData, classDate: date || new Date() })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="inputData" className="block text-sm font-medium text-gray-700">
              Input Data
            </label>
            <textarea
              id="inputData"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.inputData}
              onChange={(e) => setFormData({ ...formData, inputData: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassPlanModal;