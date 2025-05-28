import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendar, FaGraduationCap } from "react-icons/fa6";
import api from "../../../config/axios";
import { useAuth } from "../../../contexts/AuthContext";
import SelectedStudent from "./SelectedStudent";
import { Student } from "./types";

const Students = () => {
  const { user } = useAuth();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        const data = response.data as Student[];
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Erro ao buscar alunos.");
      }
    };

    fetchStudents();
  }, []);

  const handleCopyLink = () => {
    const origin = window.location.origin;
    const link = `${origin}/convite/${user?.inviteCode || ""}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copiado com sucesso!");
    });
  };

  return (
    <div className="flex flex-col gap-2 p-10 bg-white rounded-box mx-5 mt-8 gap-8 shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-black font-sans">
              Gerenciador de Alunos
            </h1>
            <h2 className="text-gray-600 text-xl font-medium            ">
              Gerencie seus alunos com facilidade e eficiência
            </h2>
          </div>
          <button
            onClick={handleCopyLink}
            className="btn btn-ghost font-thin  px-4 py-2 rounded-md"
          >
            <LinkIcon className="ml-2 w-6 h-6" />
            Copiar Link de Convite
          </button>
        </div>
        <p className="text-gray-600 text-lg font-sans w-3/4">
          Aqui você pode adicionar, editar e remover alunos, além de visualizar
          informações detalhadas sobre cada um deles.
        </p>
      </div>

      {!selectedStudent && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Alunos Cadastrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 hover:shadow-2xl transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="">
                    <h3 className="text-xl font-regular font-semibold">
                      {student.name.charAt(0).toUpperCase() +
                        student.name.slice(1)}
                    </h3>
                    <span className="text-gray-500 text-md">
                      {student.email}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex text-gray-600 font-semibold items-center gap-2">
                    <FaGraduationCap />
                    Nível de Proficiência:{" "}
                    <span className="font-normal text-gray-600">
                      {student.proficiencyLevel}
                    </span>
                  </div>
                  <div className="text-gray-600 font-semibold flex items-center gap-2">
                    <FaCalendar />
                    Criado em:{" "}
                    <span className="font-normal text-gray-600">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedStudent && (
        <SelectedStudent
          selectedStudent={selectedStudent}
          handleReturn={() => {
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default Students;
