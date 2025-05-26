import { useState } from "react";
import { ClipboardCopy, CheckCircle, FileDown } from "lucide-react";

interface GeneratedExercisesProps {
  exercises: string[];
}

export function GeneratedExercises({ exercises }: GeneratedExercisesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyExercise = (exercise: string, index: number) => {
    navigator.clipboard.writeText(exercise);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(exercises.join("\n\n"));
    setAllCopied(true);
    setTimeout(() => {
      setAllCopied(false);
    }, 2000);
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF with exercises:", exercises);
    alert("Funcionalidade de PDF será implementada em breve!");
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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Exercícios gerados</h3>
          <div className="flex gap-2">
            <button
              onClick={handleGeneratePDF}
              className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              <FileDown className="h-4 w-4 mr-1" />
              Gerar PDF
            </button>
            <button
              onClick={handleCopyAll}
              className="flex items-center px-3 py-1 bg-[#FF7A00] hover:bg-orange-600 text-white text-sm rounded transition-colors"
            >
              {allCopied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Copiado tudo
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4 mr-1" />
                  Copiar tudo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {exercises.map((exercise, index) => (
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
                  onClick={() => handleCopyExercise(exercise, index)}
                  className="ml-4 text-gray-500 hover:text-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  {copiedIndex === index ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <ClipboardCopy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeneratedExercises; 