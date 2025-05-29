import { X } from 'lucide-react';
import React from 'react';
import { ClassPlan } from '../../types';

interface ViewClassPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: ClassPlan | null;
}

const ViewClassPlanModal: React.FC<ViewClassPlanModalProps> = ({
  isOpen,
  onClose,
  plan
}) => {
  if (!isOpen || !plan) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-300/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[80%] flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Detalhes da aula</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tópico</h3>
              <p className="text-gray-700">{plan.topic}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Data da Aula</h3>
              <p className="text-gray-700">{formatDate(plan.classDate)}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Plano de Aula</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{plan.aiGeneratedContent}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClassPlanModal;