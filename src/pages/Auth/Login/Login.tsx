import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginController } from "./LoginController";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { onSubmit, loading } = useLoginController();

  const handleSubmitForm = (data: { email: string; password: string }) => {
    onSubmit(data);
  };
  return (
    <main className="min-h-screen p-10 flex flex-col items-center pt-24 bg-gray-100">
      <h1 className="text-5xl font-bold text-ne_primary mb-2">NeoEduc</h1>
      <h2 className="text-2xl text-gray-600 mb-8">Aproveite nossa plataforma</h2>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center justify-center gap-6 w-full max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-4">Entrar</h2>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`input w-full px-4 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="password"
            placeholder="Senha"
            {...register("password")}
            className={`input w-full px-4 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-ne_primary text-white w-full py-2 rounded-md hover:bg-ne_primary-dark transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 
          <span className="loading loading-spinner text-black"></span>
          : "Login"}
        </button>
      </form>
      <div className="flex flex-col items-center mt-6">
        <span className="text-gray-600">Não tem uma conta?</span>
        <a href="/auth/signup" className="text-ne_primary underline mt-1">
          Crie uma agora
        </a>
      </div>
    </main>
  );
};

export default Login;
