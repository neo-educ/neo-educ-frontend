const GeneratedActivity = ({
  activityResponse,
}: {
  activityResponse: string;
}) => {
  const questions = activityResponse?.split("\n").filter((question) => question.trim() !== "");

  return (
    <dialog id="activity-modal" className="modal">
      <div className="modal-box h-[80vh]">
        <h3 className="text-lg font-bold">Questões!</h3>
        <p className="py-4">Essa foram as questões geradas pela IA</p>
      <label className="modal-backdrop" htmlFor="my_modal_7">
        Close
      </label>
      {questions?.map((question, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold">{`Pergunta ${index + 1}`}</h3>
          <p className="text-gray-700">{question}</p>
        </div>
      ))}
      </div>
    </dialog>
  );
};

export default GeneratedActivity;
