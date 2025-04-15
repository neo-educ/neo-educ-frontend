import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/axios";
import { useAuth } from "../../../contexts/AuthContext";

export const useLoginController = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await api.post("auth/login", data);
      if (response.status === 200) {
        const result = response.data;
        const user = result.user;
        const token = result.token;
        const expiresIn = result.expiresIn;

        signIn({
          user,
          token,
          expiresIn,
        });
      } else {
        toast.error(response.data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      toast.error("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  return {
    onSubmit,
    loading,
  };
};
