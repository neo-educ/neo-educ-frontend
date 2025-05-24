import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignupController } from "./SignupController";
import { SignupData, signupSchema } from "./SignupUtils";

const formatPhoneNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") // Format as (99) 99999-9999
    .replace(/^(\d{2})(\d{0,5})/, "($1) $2") // Handle incomplete input
    .replace(/^(\(\d{2}\) \d{6})(\d{0,4})/, "$1-$2"); // Handle incomplete input
};

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const { onSignup, loading } = useSignupController();

  const handleSubmitForm = (data: SignupData) => {
    onSignup({ ...data, phone: data.phone.replace(/\D/g, "") });
  };
  return (
    <main className="min-h-screen p-8 flex flex-col items-center pt-24">
      <h1 className="text-5xl text-ne_primary">NeoEduc</h1>
      <h2 className="text-3xl">Crie sua conta </h2>
      <h3 className="text-2xl">Descubra um jeito novo de ensinar</h3>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center gap-4 w-1/2 mx-auto mt-2 p-4 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-4xl">Registrar</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Nome"
              {...register("name")}
              className={` input ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Sobrenome"
              {...register("lastName")}
              className={`input ${errors.lastName ? "input-error" : ""}`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className={`input ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
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
          <div className="flex flex-col gap-1">
            <input
              type="text"
              maxLength={15}
              placeholder="Telefone"
              {...register("phone")}
              className={`input ${errors.phone ? "input-error" : ""}`}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value);
              }}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-ne_primary w-1/4 rounded"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </main>
  );
};

export default Signup;
