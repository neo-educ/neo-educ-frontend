import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/axios";
import { useAuth } from "../../../contexts/AuthContext";

export const useLoginController = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const onSubmit = async (data: { email: string; password: string }, retryCount = 0) => {
    try {
      setLoading(true);
      const response = await api.post("auth/login", data);
      const result = response.data;
      const user = result.user;
      const token = result.token;
      const expiresIn = result.expiresIn;

      signIn({
        user,
        token,
        expiresIn,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 && retryCount < 1) {
          // Retry once
          return onSubmit(data, retryCount + 1);
        }
        toast.error(error.response?.data?.message || "Erro ao fazer login");
      } else {
        toast.error("Erro ao fazer login");
        setLoading(false)
      }
    }
  };
  return {
    onSubmit,
    loading,
  };
};
