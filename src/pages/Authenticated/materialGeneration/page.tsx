import Cookies from 'js-cookie';
import { Sparkles, BookOpen, GraduationCap, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import GeneratedSentences from "./components/GeneratedSentences";
import { generateMaterial } from "../../../services/materialGenerationApi";

interface MaterialGenerationFormData {
  topic: string;
  level: string;
  interests: string[];
}

export function PageMaterialGeneration() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: MaterialGenerationFormData = {
      topic: (e.target as HTMLFormElement).topic.value,
      level: (e.target as HTMLFormElement).level.value,
      interests: (e.target as HTMLFormElement).interests.value
        ? (e.target as HTMLFormElement).interests.value.split(',').map((interest: string) => interest.trim())
        : [],
    };

    setIsLoading(true);
    try {
      const token = Cookies.get('token') || '';
      const generatedSentences = await generateMaterial(formData, token);
      setSentences(generatedSentences);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating material:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="topic" className="flex gap-2 items-center text-center">
              <BookOpen size={24} color="#FF7A00"/> 
              <span className="text-black text-lg font-sans">Assunto</span>
            </label>

            <input type="text" id="topic" name="topic" className="input border-solid border-gray-300 hover:border-[#FF7A00] focus:border-[#FF7A00] hover:cursor-pointer focus:outline-0 w-full font-sans text-sm font-normal" placeholder="Exemplo: Past perfect, Verb to be, Present continuous, etc." required/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="level" className="flex gap-2 items-center text-center">
              <GraduationCap size={24} color="#FF7A00"/>
              <span className="text-black text-lg font-sans">Nível</span>
            </label>

            <select id="level" name="level" className="select border-solid border-gray-300 hover:border-[#FF7A00] focus:border-[#FF7A00] hover:cursor-pointer focus:outline-0 bg-gray-100 w-full font-sans text-sm font-normal" required>
              <option value="A1">Beginner (A1)</option>
              <option value="A2">Beginner (A2)</option>
              <option value="B1">Intermediate (B1)</option>
              <option value="B2">Intermediate (B2)</option>
              <option value="C1">Advanced (C1)</option>
              <option value="C2">Advanced (C2)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="interests" className="flex gap-2 items-center text-center">
              <Heart size={24} color="#FF7A00"/>
              <span className="text-black text-lg font-sans">Interesses</span>
            </label>

            <textarea id="interests" name="interests" className="textarea border-solid border-gray-300 hover:border-[#FF7A00] focus:border-[#FF7A00] hover:cursor-pointer focus:outline-0 w-full font-sans text-base font-normal" placeholder="Insira os interesses separados por vírgula. Exemplo: viagem, tecnologia, esportes, etc." required/>
          </div>

          <button 
            type="submit" 
            className="btn bg-[#FF7A00] hover:brightness-125 text-white font-sans font-normal text-xl w-1/2 mx-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Gerar'}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 text-[#FF7A00] animate-spin" />
        </div>
      )}

      {isGenerated && !isLoading && (
        <GeneratedSentences sentences={sentences} />
      )}
    </div>
  );
}