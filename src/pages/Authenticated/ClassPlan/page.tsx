import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClassPlansTable from "./components/ClassPlansTable";
import CreateClassPlanModal from "./components/modal/ClassPlansCreateModal";
import UpdateClassPlanModal from "./components/modal/ClassPlansUpdateModal";
import { ClassPlan, ClassPlanCreate } from "./types";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../config/axios";
import toast from "react-hot-toast";
import ViewClassPlanModal from "./components/modal/ViewClassPlansModal";
import ClassPlanCalendar from "./components/ClassPlansCalendar";

const ClassPlansPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ClassPlan | null>(null);
  const { user } = useAuth();
  const [classPlans, setClassPlans] = useState<ClassPlan[]>([]);

  const fetchClassPlans = async () => {
    const response = await api.get("class-plans");
    if (response.status === 200) {
      setClassPlans(response.data);
    } else {
      toast.error(response.data.message || "Erro ao buscar planos de aula");
    }
  };

  useEffect(() => {
    fetchClassPlans();
  }, []);

  const handleCreatePlan = async (data: ClassPlanCreate) => {
    try {
      await api.post("class-plans", data);
      toast.success("Plano de aula criado com sucesso!");
      await fetchClassPlans();
    } catch (error: unknown) {
      const message =
      //@ts-expect-error falta de tipagem pelo typescript
        error.response?.data?.message || error.response?.data?.detail || "Erro ao criar plano de aula";
      toast.error(message);
    }
  };
  
  const handleViewPlan = (plan: ClassPlan) => {
    setSelectedPlan(plan);
    setIsViewModalOpen(true);
  };

  const handleUpdatePlan = async (data: ClassPlanCreate) => {
    if (!selectedPlan) return;

    try {
      const response = await api.put(
        `class-plans/update/${selectedPlan.id}`,
        {
          topic: data.topic,
          classDate: data.classDate,
          inputData: data.inputData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Plano de aula atualizado com sucesso!");
        await fetchClassPlans();
      } else {
        toast.error(response.data.message || "Erro ao atualizar plano de aula");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer requisição para atualizar plano de aula");
    }
  };

  const handleEditPlan = (plan: ClassPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = async (planId: number) => {
    if (window.confirm("Tem certeza que quer deletar esse plano de aula?")) {
      const response = await api.delete(`class-plans/${planId}`);
      if (response.status === 200) {
        toast.success("Plano de aula deletado com sucesso!");
        await fetchClassPlans();
      } else {
        toast.error(
          response.data.message || "Não foi possível deletar o plano de aula"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Seus Planos de Aulas
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Gerencie e visualize todos os seus planos de aula em um só lugar
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedPlan(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Plano de Aula
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ClassPlansTable 
              plans={classPlans}
              onView={handleViewPlan}
              onEdit={handleEditPlan}
              onDelete={handleDeletePlan}
            />
          </div>
          <div>
            <ClassPlanCalendar 
              plans={classPlans} 
            />
          </div>
        </div>

        {!selectedPlan && (
          <CreateClassPlanModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlan(null);
            }}
            onSubmit={handleCreatePlan}
            teacherEmail={user?.email || ""}
          />
        )}

        {selectedPlan && (
          <UpdateClassPlanModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlan(null);
            }}
            onSubmit={handleUpdatePlan}
            initialData={{
              topic: selectedPlan.topic,
              classDate: new Date(selectedPlan.classDate),
              inputData: selectedPlan.inputData,
              teacher_email: user?.email || "",
            }}
          />
        )}
        <ViewClassPlanModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
        />
      </div>
    </div>
  );
};

export default ClassPlansPage;
