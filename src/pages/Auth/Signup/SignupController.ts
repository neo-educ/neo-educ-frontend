import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "../../../config/axios";
import { SignupData, signupSchema } from "./SignupUtils";

export const useSignupController = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSignup = async (data: SignupData) => {
    try {
      setLoading(true);

      const parsedData = signupSchema.parse(data);

      await api.post("auth/signup", parsedData);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.response.data.message || "Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    onSignup,
    loading,
  };
};
