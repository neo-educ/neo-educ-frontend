import HomeNavBar from "./components/HomeNavBar";
import InfoCard from "./components/InfoCard";

const cards = [
  {
    titulo: "Planos de Aula Personalizados",
    descricao:
      "Crie planos de aula completos em segundos com o apoio da inteligência artificial. Basta informar o tema, nível do aluno e seus interesses.",
  },
  {
    titulo: "Geração de Conteúdo com IA",
    descricao:
      "Gere exercícios, diálogos simulados, vocabulário e sugestões automaticamente com base no perfil do aluno.",
  },
  {
    titulo: "Gestão de Alunos",
    descricao:
      "Cadastre seus alunos, acompanhe o progresso e registre anotações sobre o desempenho em cada aula.",
  },
  {
    titulo: "Flashcards Personalizados",
    descricao:
      "Reforce o aprendizado com flashcards gerados automaticamente para revisão de vocabulário e expressões.",
  },
  {
    titulo: "Agenda de Aulas",
    descricao:
      "Organize seus horários com um calendário integrado. Visualize aulas agendadas e receba lembretes.",
  },
  {
    titulo: "Relatórios de Desempenho",
    descricao:
      "Gere relatórios visuais sobre o progresso dos alunos, incluindo frequência, vocabulário aprendido e notas de aula.",
  },
];

const LandingPage = () => {
  return (
    <>
    <HomeNavBar />
    <main className="p-10 flex flex-col relative min-w-screen min-h-screen ">
      <section className="w-full min-h-[90vh] flex items-center justify-center  ">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl text-ne_primary text-center">
            Ensine melhor com NeoEduc
          </h1>
          <h2 className="text-center">
            Otimize seu tempo com qualidade e segurança
          </h2>
          <a
            href="/auth/signup"
            className="mt-2 bg-ne_primary text-white btn font-thin"
          >
            Começe agora
          </a>
        </div>
        {/* <i className="fi fi-br-angle-down"></i> */}
      </section>
      <section className="h-96 w-full flex flex-col justify-center items-center gap-5 ">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl text-ne_primary">Assine e desfrute</h2>
          <p className="text-lg text-gray-700">
            Uma plataforma de ensino online que conecta professores e alunos de
            forma simples e eficiente.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-3/4">
          {cards.map((card, index) => (
            <InfoCard
              key={index}
              title={card.titulo}
              description={card.descricao}
              icon=""
              />
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl">Comece no <strong className="text-ne_primary">NeoEduc</strong></h1>
          <h2>E tenha a educação do futuro em suas mãos</h2>
          <a href="/auth/signup" className="mt-2 bg-ne_primary text-white btn font-thin ">
            Começe agora
          </a>
      </section>
    </main>
    </>
  );
};

export default LandingPage;
