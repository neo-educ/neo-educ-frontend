import { useState } from "react";
import toast from "react-hot-toast";
import { GiFinishLine } from "react-icons/gi";
import { useParams } from "react-router-dom";
import api from "../../config/axios";

type Interest = {
  id: number;
  name: string;
  icon: string;
  description: string;
};

const interests: Interest[] = [
  {
    id: 1,
    name: "Entretenimento",
    icon: "🎬",
    description:
      "Aprenda inglês com filmes, séries, músicas, animações e cultura pop.",
  },
  {
    id: 2,
    name: "Desenvolvimento Pessoal",
    icon: "🧠",
    description:
      "Explore produtividade, autoconhecimento e saúde mental em inglês.",
  },
  {
    id: 3,
    name: "Educação e Carreira",
    icon: "📚",
    description:
      "Aprofunde-se em inglês para negócios, tecnologia, marketing e muito mais.",
  },
  {
    id: 4,
    name: "Estilo de Vida e Cultura",
    icon: "🌍",
    description:
      "Pratique inglês com temas como viagens, moda, culinária e sustentabilidade.",
  },
  {
    id: 5,
    name: "Hobbies e Interesses Pessoais",
    icon: "🕹️",
    description:
      "Games, arte, leitura, jardinagem e muito mais para aprender inglês com o que você ama.",
  },
];

interface FormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  proficiencyLevel: ProficiencyLevel;
}

enum ProficiencyLevel {
  C1,
  C2,
  B1,
  B2,
  A1,
  A2,
}

const CadastroAluno = () => {
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState<Interest[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    proficiencyLevel: ProficiencyLevel.C2,
  });

  const handleSubmit = async () => {
    const data = {
      ...formData,
      token,
      interests: selectedInterest.map((interest) => interest.id),
    };
    try {
      setLoading(true);
      await api.post("students", data);
      toast.success("Cadastro realizado com sucesso!");
      setLoading(false);
      return true; // Retorna sucesso
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar aluno.");
      setLoading(false);
      return false; // Retorna falha
    }
  };

  const handleSelectInterest = (interestId: number) => {
    const interest = interests.find((interest) => interest.id === interestId);
    if (interest) {
      setSelectedInterest((prev) =>
        prev.includes(interest)
          ? prev.filter((i) => i !== interest)
          : [...prev, interest]
      );
    }
  };

  const verifyAccountInformation = () => {
    const { name, lastName, email, phone } = formData;
    if (!name || !lastName || !email || !phone) {
      toast.error("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const handleFoward = async () => {
    if (step == 1) {
      const isValid = verifyAccountInformation();
      if (!isValid) return;
    }
    if (step == 2) {
      if (selectedInterest.length === 0) {
        toast.error("Selecione pelo menos um interesse.");
        return;
      }
      const isSubmitted = await handleSubmit();
      if (!isSubmitted) return; // Não avança se o handleSubmit falhar
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleVoltar = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center px-4">
      <div
        className="p-5 bg-white rounded-box shadow-lg w-full max-w-[70%] min-h-[70%] max-h-[90%] 
        flex flex-col gap-2 items-center"
      >
        <div className="w-full 2xl:w-[50%] h-full flex-1 flex flex-col gap-5 justify-center">
          {step == 1 && (
            <>
              <div className="flex flex-col gap-1 items-center">
                <h1 className="text-5xl font-bold">Bem-vindo!</h1>
                <h2 className="text-lg text-center">
                  Você foi convidado para ser um aluno de{" "}
                  <span className="text-ne_primary">Fernando Alvarez</span>
                </h2>
                <h2 className="text-md text-center">
                  Por favor, preencha os dados abaixo para continuar.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8 w-full">
                <input
                  type="text"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      proficiencyLevel: Number(e.target.value),
                    });
                  }}
                  defaultValue={formData.proficiencyLevel}
                >
                  <option disabled>Selecione seu nível de proficiência</option>
                  <option value={ProficiencyLevel.A1}>A1</option>
                  <option value={ProficiencyLevel.A2}>A2</option>
                  <option value={ProficiencyLevel.B1}>B1</option>
                  <option value={ProficiencyLevel.B2}>B2</option>
                  <option value={ProficiencyLevel.C1}>C1</option>
                  <option value={ProficiencyLevel.C2}>C2</option>
                </select>
              </div>
            </>
          )}
          {step == 2 && (
            <div className="mt-5 flex flex-col gap-5 items-center">
              <div className="flex flex-col gap-1 items-center">
                <label className="text-3xl block text-gray-800 text-center">
                  Aprenda inglês com o que você ama!
                </label>
                <p className="text-gray-700 text-center">
                  Seus interesses serão utilizados para criar conteúdos
                  personalizados para você.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {interests.map((interest) => (
                  <div
                    key={interest.id}
                    className={`card  w-full bg-base-100 shadow-xl cursor-pointer border ${
                      selectedInterest.includes(interest)
                        ? "border-ne_primary"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleSelectInterest(interest.id)}
                  >
                    <div className="relative card-body p-2 items-center text-center">
                      <input
                        type="checkbox"
                        checked={selectedInterest.includes(interest)}
                        className="checkbox absolute top-2 left-2"
                      />
                      <span className="2xl:text-5xl text-3xl">
                        {interest.icon}
                      </span>
                      <h2 className="card-title text-md 2xl:text-lg font-bold">
                        {interest.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step == 3 && (
            <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
              <div className="flex items-center justify-center bg-ne_primary-100 rounded-full p-6">
                <GiFinishLine className="text-8xl text-ne_primary" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">
                Cadastro concluído!
              </h1>
              <p className="text-lg text-center text-gray-600">
                Obrigado por se cadastrar! Você está pronto para começar sua
                jornada de aprendizado de inglês!
              </p>
            </div>
          )}
          {step != 3 && (
            <>
              <div className="flex justify-between">
                {step == 2 && (
                  <button
                  disabled={loading}
                    className="btn bg-black text-white mt-5 disabled:opacity-50"
                    onClick={handleVoltar}
                  >
                    Voltar
                  </button>
                )}
                <button
                  disabled={loading}
                  className={`btn disabled:opacity-50 bg-black text-white font-regular mt-5 ${
                    step !== 2 ? "ml-auto" : ""
                  }`}
                  onClick={handleFoward}
                >
                  {step == 2 ? "Concluir" : "Avançar"}
                </button>
              </div>
              <progress
                className="progress w-full text-ne_primary"
                value={(step - 1) * 50}
                max="100"
              ></progress>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default CadastroAluno;
