import { FormEvent } from "react";
import { Student } from "./types";

const notes = [
  {
    title: "Anotações do Professor",
    content: "Estudante muito dedicado, sempre participa das aulas.",
  },
  {
    title: "Anotações do Professor",
    content: "Estudante muito dedicado, sempre participa das aulas.",
  },
  {
    title: "Anotações do Professor",
    content: "Estudante muito dedicado, sempre participa das aulas.",
  },
  {
    title: "Anotações do Professor",
    content: "Estudante muito dedicado, sempre participa das aulas.",
  },
];

const StudentNotes = (
  { student }: { student: Student } // Adjust type as needed
) => {
  const toggleCreateNoteModal = () => {
    const modal = document.getElementById(
      "create_note_modal"
    ) as HTMLDialogElement;
    if (modal)
      if (modal.open) {
        modal.close();
        return;
      }
    modal.showModal();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    toggleCreateNoteModal();
  };

  return (
    <div className="tab-content border-base-300 bg-base-100 p-4 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Anotações sobre{" "}
          {student.name.charAt(0).toUpperCase() + student.name.slice(1)}
        </h2>
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleCreateNoteModal}
        >
          Adicionar Anotação
        </button>
      </div>

      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-md font-semibold mb-2">{note.title}</h3>
              <p className="text-sm text-gray-700">{note.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma anotação disponível.</p>
        )}
      </div>
      <StudentNoteCreateModal handleSubmit={handleSubmit} />
    </div>
  );
};

export default StudentNotes;

const StudentNoteCreateModal = ({
  handleSubmit,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Adjust type as needed
}) => {
  return (
    <dialog id="create_note_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Cadastrar Nova Anotação</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Título da Anotação</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Observações sobre o desempenho"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Conteúdo</span>
            </label>
            <textarea
              placeholder="Descreva a anotação aqui..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <button type="submit" className="btn bg-black text-white w-full">
            Salvar Anotação
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
