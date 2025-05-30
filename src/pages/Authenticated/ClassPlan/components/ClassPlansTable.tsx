import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Trash2, Eye } from "lucide-react";
import { ClassPlan } from "../types";
interface ClassPlansTableProps {
  plans: ClassPlan[];
  onView: (plan: ClassPlan) => void;
  onEdit: (plan: ClassPlan) => void;
  onDelete: (planId: number) => void;
}

const ClassPlansTable: React.FC<ClassPlansTableProps> = ({
  plans,
  onView,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof ClassPlan>("classDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof ClassPlan) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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
  

  const filteredAndSortedPlans = plans
    .filter(
      (plan) =>
        plan.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.inputData.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const SortIcon = ({ field }: { field: keyof ClassPlan }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp
        size={12}
        className={`${
          sortField === field && sortDirection === "asc"
            ? "text-primary-600"
            : "text-gray-400"
        }`}
      />
      <ChevronDown
        size={12}
        className={`${
          sortField === field && sortDirection === "desc"
            ? "text-primary-600"
            : "text-gray-400"
        }`}
      />
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Pesquise por plano de aula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("topic")}
              >
                <div className="flex items-center">
                  Assunto
                  <SortIcon field="topic" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("classDate")}
              >
                <div className="flex items-center">
                  Data
                  <SortIcon field="classDate" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plano de aula
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Opções
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {plan.topic}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(plan.classDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {plan.aiGeneratedContent?.length > 50
                      ? plan.aiGeneratedContent.slice(0, 50) + "..."
                      : plan.aiGeneratedContent}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onView(plan)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(plan.id)}
                      className="text-error-600 hover:text-error-900 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassPlansTable;
