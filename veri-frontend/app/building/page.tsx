
"use client"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGlobalState } from "../global/ContextGlobalState"

import { toast } from "sonner"
import { useLogout } from "@/service/query/authentication"
import { useRouter } from 'next/navigation'
export default function Building() {

    const { userOnline, setUserOnline } = useGlobalState()
    const { mutateAsync: mutateLogout } = useLogout()
    const router = useRouter()

    async function retornar() {
        if (userOnline?.token !== undefined) {

            mutateLogout(userOnline?.token)
                .then((rtn) => {
                    setUserOnline(null);
                    router.back()
                    //window.history.back()
                })
                .catch((error) => {
                    const errorMessage =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Erro desconhecido"

                    toast.error(errorMessage)
                })
        }

    }
    return (
        <div className="flex items-center justify-center h-screen bg-muted px-4">
            <div className="text-center space-y-6">
                <AlertTriangle className="mx-auto text-yellow-500 w-16 h-16" />

                <h1 className="text-2xl font-semibold text-foreground">
                    Olá, {userOnline?.name}! Esta página está em construção
                </h1>

                <p className="text-muted-foreground">
                    Estamos trabalhando para deixar tudo pronto. Volte mais tarde. 🚧
                </p>
                <Button variant="outline" onClick={retornar}>
                    Voltar
                </Button>
            </div>
        </div>
    )
}
