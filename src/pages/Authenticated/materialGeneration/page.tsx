import Cookies from 'js-cookie';
import { Sparkles, BookOpen, GraduationCap, Heart, Loader2, FileText, MessageCircle, Hash } from "lucide-react";
import { useState } from "react";
import GeneratedSentences from "./components/GeneratedSentences";
import GeneratedExercises from "./components/GeneratedExercises";
import { generateMaterial, generateExercises } from "../../../services/materialGenerationApi";

interface MaterialGenerationFormData {
  topic: string;
  level: string;
  interests: string[];
}

interface ExerciseGenerationFormData {
  topic: string;
  level: string;
  interests: string[];
  quantity: number;
}

type MaterialType = "conversation" | "exercises";

export function PageMaterialGeneration() {
  const [materialType, setMaterialType] = useState<MaterialType>("conversation");
  const [sentences, setSentences] = useState<string[]>([]);
  const [exercises, setExercises] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleConversationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleExerciseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: ExerciseGenerationFormData = {
      topic: (e.target as HTMLFormElement).exerciseTopic.value,
      level: (e.target as HTMLFormElement).exerciseLevel.value,
      interests: (e.target as HTMLFormElement).exerciseInterests.value
        ? (e.target as HTMLFormElement).exerciseInterests.value.split(',').map((interest: string) => interest.trim())
        : [],
      quantity: Number.parseInt((e.target as HTMLFormElement).exerciseQuantity.value),
    };

    setIsLoading(true);
    try {
      const token = Cookies.get('token') || '';
      const generatedExercises = await generateExercises(formData, token);
      setExercises(generatedExercises);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaterialTypeChange = (type: MaterialType) => {
    setMaterialType(type);
    setIsGenerated(false);
    setSentences([]);
    setExercises([]);
  };

  const handleExerciseDelete = (index: number) => {
    setExercises(prevExercises => prevExercises.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-8 gap-8 p-4">
      <div className="flex flex-col gap-2 w-full p-4 bg-gray-100 rounded-sm">
        <h1 className="text-4xl font-bold text-black font-sans">Geração de materiais com IA</h1>
        <p className="text-gray-600 text-lg font-sans">
          Crie materiais personalizados para suas aulas de inglês com inteligência artificial.
        </p>
      </div>

      <div className="flex justify-end">
        <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
          <button
            onClick={() => handleMaterialTypeChange("conversation")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all cursor-pointer ${
              materialType === "conversation"
                ? "bg-[#FF7A00] text-white shadow-sm"
                : "text-gray-600 hover:text-[#FF7A00] hover:bg-gray-50"
            }`}
          >
            <MessageCircle size={18} />
            <span className="font-medium">Conversação</span>
          </button>
          <button
            onClick={() => handleMaterialTypeChange("exercises")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all cursor-pointer ${
              materialType === "exercises"
                ? "bg-[#FF7A00] text-white shadow-sm"
                : "text-gray-600 hover:text-[#FF7A00] hover:bg-gray-50"
            }`}
          >
            <FileText size={18} />
            <span className="font-medium">Exercícios</span>
          </button>
        </div>
      </div>

      {materialType === "conversation" && (
        <div className="flex flex-col gap-2 w-full bg-white rounded-sm shadow-lg">
          <div className="flex gap-2 w-full p-4 bg-gradient-to-r from-[#FF7A00] to-orange-500 text-center items-center">
            <Sparkles size={24} color="white"/>
            <p className="text-2xl font-bold text-white">Gere materiais de conversação</p>
          </div>

          <form className="flex flex-col gap-4 p-4" onSubmit={handleConversationSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="topic" className="flex gap-2 items-center text-center">
                <BookOpen size={24} color="#FF7A00"/> 
                <span className="text-black text-lg font-sans">Assunto</span>
              </label>

              <input
                type="text"
                id="topic"
                name="topic"
                className="p-3 border border-gray-300 rounded-md hover:border-[#FF7A00] focus:border-[#FF7A00] focus:outline-none w-full font-sans text-sm"
                placeholder="Exemplo: Past perfect, Verb to be, Present continuous, etc."
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="level" className="flex gap-2 items-center text-center">
                <GraduationCap size={24} color="#FF7A00"/>
                <span className="text-black text-lg font-sans">Nível</span>
              </label>

              <select
                id="level"
                name="level"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent cursor-pointer hover:border-[#FF7A00] transition-colors"
                required
              >
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

              <textarea
                id="interests"
                name="interests"
                className="p-3 border border-gray-300 rounded-md hover:border-[#FF7A00] focus:border-[#FF7A00] focus:outline-none w-full font-sans text-base min-h-[100px] resize-y"
                placeholder="Insira os interesses separados por vírgula. Exemplo: viagem, tecnologia, esportes, etc."
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FF7A00] hover:bg-[#E56E00] cursor-pointer'
              } transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? "Gerando..." : "Gerar"}
            </button>
          </form>
        </div>
      )}

      {materialType === "exercises" && (
        <div className="flex flex-col gap-2 w-full bg-white rounded-sm shadow-lg">
          <div className="flex gap-2 w-full p-4 bg-gradient-to-r from-[#FF7A00] to-orange-500 text-center items-center">
            <FileText size={24} color="white"/>
            <p className="text-2xl font-bold text-white">Gere exercícios personalizados</p>
          </div>

          <form className="flex flex-col gap-4 p-4" onSubmit={handleExerciseSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="exerciseTopic" className="flex gap-2 items-center text-center">
                <BookOpen size={24} color="#FF7A00"/>
                <span className="text-black text-lg font-sans">Tópico do exercício</span>
              </label>

              <input
                type="text"
                id="exerciseTopic"
                name="exerciseTopic"
                className="p-3 border border-gray-300 rounded-md hover:border-[#FF7A00] focus:border-[#FF7A00] focus:outline-none w-full font-sans text-sm"
                placeholder="Exemplo: Past perfect, Simple present, Conditional sentences, etc."
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="exerciseLevel" className="flex gap-2 items-center text-center">
                <GraduationCap size={24} color="#FF7A00"/>
                <span className="text-black text-lg font-sans">Nível do aluno</span>
              </label>

              <select
                id="exerciseLevel"
                name="exerciseLevel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent cursor-pointer hover:border-[#FF7A00] transition-colors"
                required
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="exerciseInterests" className="flex gap-2 items-center text-center">
                <Heart size={24} color="#FF7A00"/>
                <span className="text-black text-lg font-sans">Interesses dos alunos</span>
              </label>

              <textarea
                id="exerciseInterests"
                name="exerciseInterests"
                className="p-3 border border-gray-300 rounded-md hover:border-[#FF7A00] focus:border-[#FF7A00] focus:outline-none w-full font-sans text-base min-h-[100px] resize-y"
                placeholder="Descreva os interesses dos alunos para personalizar os exercícios. Exemplo: jogos, música, filmes, esportes, tecnologia, etc."
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="exerciseQuantity" className="flex gap-2 items-center text-center">
                <Hash size={24} color="#FF7A00"/>
                <span className="text-black text-lg font-sans">Quantidade de exercícios</span>
              </label>

              <select
                id="exerciseQuantity"
                name="exerciseQuantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent cursor-pointer hover:border-[#FF7A00] transition-colors"
                required
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} exercício{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FF7A00] hover:bg-[#E56E00] cursor-pointer'
              } transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? "Gerando..." : "Gerar Exercícios"}
            </button>
          </form>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 text-[#FF7A00] animate-spin" />
        </div>
      )}

      {isGenerated && !isLoading && materialType === "conversation" && (
        <GeneratedSentences sentences={sentences} />
      )}

      {isGenerated && !isLoading && materialType === "exercises" && (
        <GeneratedExercises 
          exercises={exercises} 
          onExerciseDelete={handleExerciseDelete}
        />
      )}
    </div>
  );
}