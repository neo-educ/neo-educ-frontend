import { FileDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmailModal } from "./EmailModal";
import { exportExercisesToPDF } from "../../../../services/materialGenerationApi";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

interface GeneratedExercisesProps {
  exercises: string[];
  onExerciseDelete?: (index: number) => void;
}

export function GeneratedExercises({ exercises, onExerciseDelete }: GeneratedExercisesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = () => {
    setIsModalOpen(true);
  };

  const handleSendPDF = async (email: string) => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }
      
      await exportExercisesToPDF(
        {
          selectedExercises: exercises,
          studentEmail: email,
        },
        token
      );
      toast.success("PDF enviado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Erro ao enviar PDF. Tente novamente.");
      console.error("Error sending PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatExerciseText = (exercise: string) => {
    return exercise
      .split("\n")
      .map((line, lineIndex) => {
        if (line.trim() === "") return null;

        if (line.match(/^Exercício \d+\)/)) {
          return (
            <div key={lineIndex} className="font-bold text-lg text-gray-900 mt-4 mb-2">
              {line}
            </div>
          );
        }

        if (line.match(/^[a-z]\)/)) {
          return (
            <div key={lineIndex} className="ml-4 mb-1 text-gray-800">
              {line}
            </div>
          );
        }

        if (line.match(/^\s*\([a-z]\)/)) {
          return (
            <div key={lineIndex} className="ml-8 text-gray-700 text-sm">
              {line}
            </div>
          );
        }

        if (line.match(/(Negativa|Interrogativa):/)) {
          return (
            <div key={lineIndex} className="ml-8 text-gray-700 font-medium">
              {line}
            </div>
          );
        }

        if (line.match(/^Escreva um pequeno parágrafo/)) {
          return (
            <div key={lineIndex} className="ml-4 mb-1 text-gray-800 italic">
              {line}
            </div>
          );
        }

        return (
          <div key={lineIndex} className="text-gray-800 mb-1">
            {line}
          </div>
        );
      })
      .filter(Boolean);
  };

  const groupedExercises = exercises.reduce((acc: string[], exercise: string) => {
    const blocks = exercise.split('\n\n').filter(block => block.trim() !== '');
    return [...acc, ...blocks];
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Exercícios gerados</h3>
          <div className="flex gap-2">
            <button
              onClick={handleGeneratePDF}
              disabled={exercises.length === 0}
              className={`flex items-center px-3 py-1 ${
                exercises.length === 0
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              } text-white text-sm rounded transition-colors`}
            >
              <FileDown className="h-4 w-4 mr-1" />
              Gerar PDF
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {groupedExercises.map((exercise, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:border-[#FF7A00] transition-colors group bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 overflow-hidden">
                  <div className="whitespace-pre-wrap break-words">
                    {formatExerciseText(exercise)}
                  </div>
                </div>
                <button
                  onClick={() => onExerciseDelete?.(index)}
                  className="ml-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-pointer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSendPDF}
        isLoading={isLoading}
      />
    </div>
  );
}

export default GeneratedExercises; 