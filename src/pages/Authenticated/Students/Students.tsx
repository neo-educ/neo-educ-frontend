import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidRightArrowSquare } from "react-icons/bi";
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
    <div className="flex flex-col max-w-4xl mx-auto mt-8 gap-8">
      <div className="flex flex-col gap-2 w-full p-4 bg-white/60 rounded-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-black font-sans">
            Gerenciador de Alunos
          </h1>
          <button
            onClick={handleCopyLink}
            className="btn bg-ne_primary bg-blue-500 font-thin text-white px-4 py-2 rounded-md"
          >
            Copiar Link de Convite
            <LinkIcon className="ml-2 w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 text-lg font-sans">
          Aqui você pode gerenciar os alunos da sua instituição de ensino. Você
          pode adicionar, editar e remover alunos, além de visualizar
          informações detalhadas sobre cada um deles.
        </p>
        {!selectedStudent && <div>
          <h2 className="text-2xl  text-black font-sans">Alunos Cadastrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                <h3 className="text-xl font-regular">{student.name}</h3>
                  <button
                  onClick={()=>{
                    setSelectedStudent(student);
                  }}
                    className="btn bg-ne_primary bg-blue-500 font-thin text-white p-2 rounded-md"
                  >
                    <BiSolidRightArrowSquare className="w-6 h-6"/>
                  </button>
                </div>
                <div>
                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-gray-600">
                    Nível de Proficiência: {student.proficiencyLevel}
                  </p>
                  <p className="text-gray-600">
                    Criado em:{" "}
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
          </div>
        </div>}
        {
          selectedStudent && (
           <SelectedStudent
            selectedStudent={selectedStudent}
            handleReturn={() => {
              setSelectedStudent(null);
            }}
           />
          )
        }
      </div>
    </div>
  );
};

export default Students;
