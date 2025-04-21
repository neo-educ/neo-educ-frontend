import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ClassPlansTable from "./components/ClassPlansTable";
import CreateClassPlanModal from "./components/modal/ClassPlansCreateModal";
import { ClassPlan, ClassPlanCreate } from "./types";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../config/axios";
import toast from "react-hot-toast";

const ClassPlansPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSelectedPlan] = useState<ClassPlan | null>(null);
  const { user } = useAuth();
  const [classPlans, setClassPlans] = useState<ClassPlan[]>([]);

  const fetchClassPlans = async() => {
    const response = await api.get("class-plans");
    if (response.status === 200) {
      setClassPlans(response.data);
    }else {
      toast.error(response.data.message || "Erro ao criar plano de aula");
    }
  } 
  useEffect(() => {
    fetchClassPlans()
  },[])
 

  const handleCreatePlan = async (data: ClassPlanCreate) => {
    const response = await api.post("class-plans", data);
    if (response.status === 200) {
      toast("Plano de aula criado com sucesso!");
    }else {
      toast.error(response.data.message || "Erro ao criar plano de aula");
    }
  };

  const handleEditPlan = (plan: ClassPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (planId: number) => {
    if (window.confirm("Are you sure you want to delete this class plan?")) {
      console.log("Deleting plan:", planId);

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
        <ClassPlansTable
          plans={classPlans}
          onEdit={handleEditPlan}
          onDelete={handleDeletePlan}
        />
        <CreateClassPlanModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null);
          }}
          onSubmit={handleCreatePlan}
          teacherEmail={user?.email || ""}
        />
      </div>
    </div>
  );
};

export default ClassPlansPage;
