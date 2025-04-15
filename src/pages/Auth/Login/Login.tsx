import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginController } from "./LoginController";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(2, "Senha deve ter pelo menos 6 caracteres"),
});

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { onSubmit,loading } = useLoginController();

  const handleSubmitForm = (data: { email: string; password: string }) => {
    onSubmit(data);
  };
  return (
    <main className="min-h-screen p-10 flex flex-col items-center pt-24">
      <h1 className="text-5xl  text-ne_primary">NeoEduc</h1>
      <h2 className="text-5xl mb-4">Aproveite nossa plataforma</h2>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center gap-4 w-1/2 mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-4xl">Entrar</h2>
        <div className="flex flex-col gap-1 w-1/2 ">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={` input ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-1/2 ">
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            className={`input ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
          
        <button type="submit" className="btn bg-ne_primary w-1/4 rounded" disabled={loading}>
          {loading?"Carregando...":"Login"}
        </button>
      </form>
      <div className="flex flex-col items-center mt-10">
        <span className="">Não tem uma conta?</span>
        <a href="/auth/signup" className="text-ne_primary underline">
          Crie uma agora
        </a>
      </div>
    </main>
  );
};

export default Login;
