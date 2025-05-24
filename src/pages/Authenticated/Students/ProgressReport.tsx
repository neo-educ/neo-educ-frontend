import { useMemo } from "react";
import { ActivityHistory } from "./types";

const getProgressColor=(grade:number)=>{
    if (grade >= 9) return "text-green-700";
    if (grade >= 7) return "text-yellow-500";
    if (grade >= 5) return "text-orange-600";
    return "text-red-700";
}

const ProgressReport = ({ data }: { data: ActivityHistory[] }) => {
  // Calcular médias por unidade
  const gradesByUnit = useMemo(() => {
    const unitMap: Record<number, number[]> = {};
    data.forEach(({ unit, grade }) => {
      if (unit != null && grade != null) {
        if (!unitMap[unit]) unitMap[unit] = [];
        unitMap[unit].push(grade);
      }
    });
    return Object.entries(unitMap).map(([unit, grades]) => ({
      unit: Number(unit),
      average: grades.reduce((a, b) => a + b, 0) / grades.length,
    }));
  }, [data]);

  // Calcular médias por assunto
  const gradesBySubject = useMemo(() => {
    const subjectMap: Record<string, { original: string; grades: number[] }> = {};
    data.forEach(({ subject, grade }) => {
      if (subject && grade != null) {
        const normalizedSubject = subject.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        if (!subjectMap[normalizedSubject]) {
          subjectMap[normalizedSubject] = { original: subject, grades: [] };
        }
        subjectMap[normalizedSubject].grades.push(grade);
      }
    });
    return Object.values(subjectMap).map(({ original, grades }) => ({
      subject: original,
      average: grades.reduce((a, b) => a + b, 0) / grades.length,
    }));
  }, [data]);

  return (
    <div className="tab-content border-base-300 bg-base-100 p-4">
      <h1 className="font-semibold text-lg">Relatório do Progresso</h1>
      <div className="flex gap-4 items-center mt-4">
        <div className="bg-base-300 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-md mb-2">Média de Notas por Unidade</h2>
          <ul>
            {gradesByUnit.map(({ unit, average }) => (
              <li key={unit} className="w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Unidade {unit}</span>
                  <span className={`font-semibold ${getProgressColor(average)}`}>{average.toFixed(2)}</span>
                </div>
                <progress className={`progress w-full ${getProgressColor(average)}`} value={average/10} max="1"></progress>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-base-300 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-md mb-2">Média de Notas por Assunto</h2>
          <ul>
            {gradesBySubject.map(({ subject, average }) => (
               <li key={subject} className="w-full">
                <div className="flex justify-between items-center w-full">
                  <span>{subject}</span>
                  <span className={`font-semibold ${getProgressColor(average)}`}>{average.toFixed(2)}</span>
                </div>
                <progress className={`progress w-full ${getProgressColor(average)}`} value={average/10} max="1"></progress>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
