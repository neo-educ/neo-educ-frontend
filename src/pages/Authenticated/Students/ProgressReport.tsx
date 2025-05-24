import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/axios";
import { ActivityHistory } from "./types";

const getProgressColor = (grade: number) => {
  if (grade >= 9) return "text-green-700";
  if (grade >= 7) return "text-yellow-500";
  if (grade >= 5) return "text-orange-600";
  return "text-red-700";
};

const ProgressReport = ({ data }: { data: ActivityHistory[] }) => {
  const [reportResponse, setReportResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const openModal = () => {
    const modal = document.getElementById("report-modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const generateIAReport = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/materiais/report", {
        data: gradesBySubject,
      });
      const data = response.data;
      setReportResponse(data);
      openModal();
    } catch {
      toast.error("Erro ao gerar relatório");
    } finally {
      setLoading(false);
    }
  };

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

  const gradesBySubject = useMemo(() => {
    const subjectMap: Record<string, { original: string; grades: number[] }> =
      {};
    data.forEach(({ subject, grade }) => {
      if (subject && grade != null) {
        const normalizedSubject = subject
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
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
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">Relatório do Progresso</h1>
        <button
          disabled={loading}
          className="btn flex items-center gap-2"
          onClick={generateIAReport}
        >
          {!loading ? (
            <>
              Gerar Relatório
              <Sparkles className="w-5 h-5 twinkle " />
            </>
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
      <div className="flex gap-4 items-center mt-4">
        <div className="bg-base-300 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-md mb-2">Média de Notas por Unidade</h2>
          <ul>
            {gradesByUnit.map(({ unit, average }) => (
              <li key={unit} className="w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Unidade {unit}</span>
                  <span
                    className={`font-semibold ${getProgressColor(average)}`}
                  >
                    {average.toFixed(2)}
                  </span>
                </div>
                <progress
                  className={`progress w-full ${getProgressColor(average)}`}
                  value={average / 10}
                  max="1"
                ></progress>
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
                  <span
                    className={`font-semibold ${getProgressColor(average)}`}
                  >
                    {average.toFixed(2)}
                  </span>
                </div>
                <progress
                  className={`progress w-full ${getProgressColor(average)}`}
                  value={average / 10}
                  max="1"
                ></progress>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GeneratedProgressReport response={reportResponse} loading={loading} />
    </div>
  );
};

export default ProgressReport;

const GeneratedProgressReport = ({
  response,
  loading,
}: {
  response: string;
  loading: boolean;
}) => {
  const lines = response.split("\n");

  return (
    <dialog id="report-modal" className="modal">
      <div className="w-[50%] bg-white p-5 rounded-xl overflow-y-auto h-[80vh]">
        <h3 className="text-3xl font-bold">Relatório de Progresso</h3>
        <p className="py-4">
          Esse é um relatório do aluno criado pela IA baseado nas suas
          atividades anteriores
        </p>
        {loading && (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner"></span>
          </div>
        )}
        {!loading && lines.length === 0 && (
          <p className="text-center">Nenhum dado encontrado.</p>
        )}
        {!loading &&
          lines.map((line: string, index: number) => {
            line = line.trim();

            if (line.startsWith("###")) {
              return (
                <h2 key={index} className="text-2xl font-bold my-2">
                  {line.replace(/^###\s*/, "")}
                </h2>
              );
            }

            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <h3 key={index} className="text-xl font-semibold">
                  {line.replace(/\*\*/g, "")}
                </h3>
              );
            }

            if (line.startsWith(">")) {
              return (
                <blockquote
                  key={index}
                  className="pl-4 border-l-4 border-gray-300 italic text-gray-600"
                >
                  {line.replace(/^>\s*/, "")}
                </blockquote>
              );
            }

            if (line === "") {
              return <div key={index} className="my-2" />;
            }

            return (
              <p key={index} className="text-base">
                {line}
              </p>
            );
          })}
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </dialog>
  );
};
