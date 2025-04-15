import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z
    .string()
    .email("Email inválido. Certifique-se de que está no formato correto."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z
    .string()
    .refine(
      (value) => value.replace(/\D/g, "").length === 11,
      "Telefone inválido. Deve conter 11 dígitos, incluindo DDD."
    ),
});
export type SignupData = z.infer<typeof signupSchema>;