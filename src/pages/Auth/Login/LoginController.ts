import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/axios";


export const useLoginController=()=>{
    const [loading,setLoading]=useState(false);
    const onSubmit=async(data: { email: string; password: string })=>{
        try{
            setLoading(true);
            const response=await api.post("auth/login", data);
            if(response.status===200){
                const result=response.data;
                const token=result.token;
                const expiresIn=result.expiresIn;

                Cookies.set("token", token, {
                    expires: new Date(Date.now() + expiresIn),
                });
                toast.success("Login realizado com sucesso!");
                setTimeout(() => {
                    window.location.href="/home";                    
                }, 1500);
            }
            else{
                console.log("Erro ao fazer login", response.status);
                toast.error(response.data.message || "Erro ao fazer login");
            }
        }catch(error){
            console.error("Erro ao fazer login", error);
            toast.error("Erro ao fazer login");
        }
        finally{
            setLoading(false);
        }
    }
    return {
        onSubmit,
        loading
    }
}