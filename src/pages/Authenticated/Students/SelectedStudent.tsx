import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendar, FaGraduationCap } from "react-icons/fa6";
import api from "../../../config/axios";
import ActivitiesHistory from "./ActivitiesHistory";
import GeneratedActivity from "./GeneratedActivity";
import ProgressReport from "./ProgressReport";
import StudentNotes from "./StudentNotes";
import { ActivityHistory, Student } from "./types";

interface Props {
  selectedStudent: Student;
  handleReturn: () => void;
}

const SelectedStudent = ({ selectedStudent, handleReturn }: Props) => {
  const [formData, setFormData] = useState({
    subject: "",
    level: "",
    studentLevel: true,
    studentInterests: true,
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activityHistory, setActivityHistory] = useState<ActivityHistory[]>([]); // Adjust the type as needed

  const fetchActivitiesHistory = async () => {
    if (!selectedStudent.id) return;
    setLoading(true);
    try {
      const response = await api.get(`/activity/${selectedStudent.id}`);
      const data = response.data;
      setActivityHistory(data as ActivityHistory[]);
    } catch {
      toast.error("Erro ao buscar histórico de atividades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivitiesHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      studentId: selectedStudent.id,
      subject: formData.subject,
      setLevel: formData.studentLevel ? null : formData.level,
      level: formData.studentLevel,
      interests: formData.studentInterests,
    };
    try {
      setLoading(true);
      const response = await api.post("/api/materiais/activity", body);
      const generatedResponse = response.data;
      setResponse(generatedResponse as string);
      openGeneratedActivityModal();
    } catch (error) {
      console.error("Error generating activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const openGeneratedActivityModal = () => {
    const modal = document.getElementById(
      "activity-modal"
    ) as HTMLDialogElement;

    console.log(modal);

    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-xl font-regular font-semibold">
            {selectedStudent.name.charAt(0).toUpperCase() +
              selectedStudent.name.slice(1)}
          </h3>
          <span className="text-gray-500 text-md">{selectedStudent.email}</span>
        </div>
        <button
          onClick={handleReturn}
          className="btn font-thin  p-2 rounded-md self-end"
        >
          Voltar
        </button>
      </div>
      <div>
        <div className="flex text-gray-600 font-semibold items-center gap-2">
          <FaGraduationCap />
          Nível de Proficiência:{" "}
          <span className="font-normal text-gray-600">
            {selectedStudent.proficiencyLevel}
          </span>
        </div>
        <div className="text-gray-600 font-semibold flex items-center gap-2">
          <FaCalendar />
          Criado em:{" "}
          <span className="font-normal text-gray-600">
            {new Date(selectedStudent.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="bg-gray-100 p-2 rounded-md mt-2">
          <div className="tabs tabs-border">
            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Nova Atividade"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-4">
              <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="input input-bordered w-full"
                    placeholder="Digite o assunto"
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block text-gray-700 font-medium"
                  >
                    Nível
                  </label>
                  <select
                    id="level"
                    className="select select-bordered w-full"
                    disabled={formData.studentLevel}
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Selecione o nível
                    </option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
                <div>
                  <span className="block text-gray-700 font-medium">
                    Configurações
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="student-level"
                      checked={formData.studentLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentLevel: e.target.checked,
                        })
                      }
                      className="checkbox"
                    />
                    <label htmlFor="student-level" className="text-gray-600">
                      Deixar no nível do aluno
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="student-interests"
                      className="checkbox"
                      checked={formData.studentInterests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentInterests: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="student-interests"
                      className="text-gray-600"
                    >
                      Basear nos interesses do aluno
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn disabled:opacity-1/2 bg-blue-500 text-white font-medium rounded-md mt-4"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Criar Atividade"
                  )}
                </button>
              </form>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Histórico de Atividades"
            />
            <ActivitiesHistory
              data={activityHistory}
              fetchData={fetchActivitiesHistory}
              studentId={selectedStudent.id}
            />

            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Relatório de Progresso"
            />
            <ProgressReport data={activityHistory} />
            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Notas do Aluno"
            />
            <StudentNotes student={selectedStudent}/>
          </div>
        </div>
      </div>
      <GeneratedActivity activityResponse={response} />
    </div>
  );
};

export default SelectedStudent;
