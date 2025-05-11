import { useAuth } from "../../../contexts/AuthContext";
import { Sparkles, BookOpen, GraduationCap, Heart } from "lucide-react";

interface FormData {
  topic: string;
  level: string;
  interests: string[];
}

export function PageMaterialGeneration() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-8 gap-8">
      <div className="flex flex-col gap-2 w-full p-4 bg-gray-100 rounded-sm">
        <h1 className="text-4xl font-bold text-black font-sans">Material de conversação</h1>
        <p className="text-gray-600 text-lg font-sans">Crie frases personalizadas para conversação em inglês com base no assunto da aula, nível do aluno e interesses.</p>
      </div>

      <div className="flex flex-col gap-2 w-full bg-white rounded-sm">
        <div className="flex gap-2 w-full p-4 bg-gradient-to-r from-[#FF7A00] to-orange-500 text-center items-center">
          <Sparkles size={24} color="white"/>
          <p className="text-2xl font-bold text-white">Gere materiais de conversação</p>
        </div>

        <form className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="topic" className="flex gap-2 items-center text-center">
              <BookOpen size={24} color="#FF7A00"/> 
              <span className="text-black text-lg font-sans">Assunto</span>
            </label>

            <input type="text" id="topic" name="topic" className="input input-bordered w-full" placeholder="Exemplo: Past perfect, Verb to be, Present continuous, etc."/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="level" className="flex gap-2 items-center text-center">
              <GraduationCap size={24} color="#FF7A00"/>
              <span className="text-black text-lg font-sans">Nível</span>
            </label>

            <input type="text" id="level" name="level" className="input input-bordered w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="interests" className="flex gap-2 items-center text-center">
              <Heart size={24} color="#FF7A00"/>
              <span className="text-black text-lg font-sans">Interesses</span>
            </label>

            <input type="text" id="interests" name="interests" className="input input-bordered w-full" placeholder="Insira os interesses separados por vírgula. Exemplo: viagem, tecnologia, esportes, etc."/>
          </div>

          <button type="submit">Gerar</button>
        </form>
      </div>
    </div>

  )
}