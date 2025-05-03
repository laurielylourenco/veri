"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/service/query/authentication"
import { login_api, User } from "@/types/user"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useGlobalState } from "@/app/global/ContextGlobalState"
import { useRouter } from 'next/navigation'


export function LoginForm() {

  const { userOnline, setUserOnline } = useGlobalState()
  const { mutateAsync: mutateLogin } = useLogin()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<login_api>()

  useEffect(() => {
    if (userOnline) {
      //window.location.href = "/building"
      router.push("/building")
    }
  }, [userOnline])

  async function onSubmit(data: login_api) {


    mutateLogin(data)
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="seu@email.com" type="email" {...register("email", { required: true })} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link href="#" className="text-xs text-blue-500 hover:text-blue-600">
              Esqueceu a senha?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password", { required: true })} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  )
}
