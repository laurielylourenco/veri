"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignUp } from "@/service/query/authentication"
import { sign_up, User } from "@/types/user"
import { toast } from "sonner"
import { useGlobalState } from "@/app/global/ContextGlobalState"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'


export function SignUpForm() {

  const { userOnline, setUserOnline } = useGlobalState()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<sign_up>()

  const { mutateAsync: mutateSignUp } = useSignUp()
  const router = useRouter()

  useEffect(() => {

    if (userOnline) {
      //window.location.href = "/building"
      router.push("/building")
    }
  }, [userOnline])

  async function onSubmit(data: sign_up) {
    mutateSignUp(data)
      .then((rtn) => {


        const user: User = {
          id: rtn.user.id,
          token: rtn.token,
          name: rtn.user.name,
          email: rtn.user.email
        }
      
        setUserOnline(user);
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Erro desconhecido"

        toast.error(errorMessage)

      })
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
