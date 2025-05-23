import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import api from "../../../config/axios";

interface ActivityHistory {
  date: Date;
  subject: string;
  unit: number;
  status: "COMPLETED" | "PENDING";
  grade: number;
}

const activitySchema = z.object({
  unit: z.string().refine((val) => {
    return !isNaN(Number(val));
  }),
  grade: z.string().refine((val) => {
    const parsed = parseFloat(val);
    return !isNaN(parsed) && parsed >= 0 && parsed <= 10;
  }),
  status: z.enum(["COMPLETED", "PENDING"]),
  subject: z.string(),
});

const ActivitiesHistory = ({ studentId }: { studentId: string }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ActivityHistory[]>([]); // Adjust the type as needed

  const fetchActivitiesHistory = async () => {
    if (!studentId) return;
    setLoading(true);
    try {
      const response = await api.get(`/activity/${studentId}`);
      const data = response.data;
      setData(data as ActivityHistory[]);
    } catch {
      toast.error("Erro ao buscar histórico de atividades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivitiesHistory();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activitySchema),
  });

  const onSubmit = async (data: {
    unit: string;
    grade: string;
    status: "COMPLETED" | "PENDING";
    subject: string;
  }) => {
    setLoading(true);
    try {
      await api.post(`/activity/`, {
        ...data,
        studentId,
        unit: parseInt(data.unit),
        grade: parseFloat(data.grade),
      });
      toast.success("Atividade adicionada com sucesso!");
      fetchActivitiesHistory();
    } catch {
      toast.error("Erro ao adicionar atividade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tab-content border-base-300 bg-base-100 p-4">
      <div className="overflow-x-auto">
        {!loading && (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Data</th>
                <th>Assunto</th>
                <th>Unidade</th>
                <th>Status</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {data.map((activity, index) => (
                <tr key={index}>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{activity.subject}</td>
                  <td>{activity.unit}</td>
                  <td>{activity.status}</td>
                  <td>{activity.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="subject" className="block text-gray-700 font-medium">
            Assunto
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            className="input input-bordered w-full"
            placeholder="Digite o assunto da atividade"
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">
              {errors.subject.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="unit" className="block text-gray-700 font-medium">
            Unidade
          </label>
          <input
            {...register("unit")}
            type="text"
            id="unit"
            className="input input-bordered w-full"
            placeholder="Digite a unidade da atividade"
          />
          {errors.unit && (
            <span className="text-red-500 text-sm">{errors.unit.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="activity-status"
            className="block text-gray-700 font-medium"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="activity-status"
            className="select select-bordered w-full"
          >
            <option value="COMPLETED">Concluído</option>
            <option value="PENDING">Pendente</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm">
              {errors.status.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="activity-grade"
            className="block text-gray-700 font-medium"
          >
            Nota
          </label>
          <input
            type="text"
            {...register("grade")}
            id="activity-grade"
            className="input input-bordered w-full"
            placeholder="Digite a nota"
            step="0.1"
          />
          {errors.grade && (
            <span className="text-red-500 text-sm">{errors.grade.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 text-white font-medium rounded-md mt-4"
        >
          Adicionar Histórico
        </button>
      </form>
    </div>
  );
};

export default ActivitiesHistory;
