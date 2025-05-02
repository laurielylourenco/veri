"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignUp } from "@/service/query/authentication"
import { sign_up } from "@/types/user"

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<sign_up>()

  const { mutateAsync: mutateSignUp } = useSignUp();


  async function onSubmit(data: sign_up) {
    console.log(data)


    mutateSignUp(data)
      .then((result) => {
        console.log('result', result);
        window.location.href = "/dashboard"
      })
      .catch((error) => {
        // Verifica se é um erro do Axios com resposta
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else if (error.message) {
          alert(error.message); // erro padrão do JS
        } else {
          alert("Erro desconhecido");
        }


      });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" placeholder="Seu nome" {...register("name", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" placeholder="seu@email.com" {...register("email", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Senha</Label>
          <Input id="signup-password" type="password" {...register("password", { required: true })} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </div>
  )
}
