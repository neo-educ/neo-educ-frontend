import React from 'react';
import { X } from 'lucide-react';
import { ClassPlan } from '../../types';

interface DayClassPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  plans: ClassPlan[];
}

const DayClassPlansModal: React.FC<DayClassPlansModalProps> = ({
  isOpen,
  onClose,
  date,
  plans
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    let isoString = dateString;
    if (!dateString.endsWith('Z')) {
      isoString = dateString + 'Z';
    }
  
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
  };

  const formatTime = (dateString: string) => {
    let isoString = dateString;
    if (!dateString.endsWith('Z')) {
      isoString = dateString + 'Z';
    }
  
    return new Date(isoString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: "America/Sao_Paulo",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Planos de Aula {formatDate(date.toString())}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {plans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aula
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(plan.classDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.topic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Não há aulas marcadas para esse dia.
          </div>
        )}
      </div>
    </div>
  );
};

export default DayClassPlansModal;