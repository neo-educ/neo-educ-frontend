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

            const response = await api.post("auth/signup", parsedData);
            if (response.status === 200) {
                toast.success("Cadastro realizado com sucesso!");
                setTimeout(() => {
                  navigate("/auth/login");
                }, 2000);
            } else {
                toast.error(response.data.message || "Erro ao cadastrar usuário!");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.errors[0].message);
            } else {
                toast.error("Erro ao cadastrar usuário!");
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