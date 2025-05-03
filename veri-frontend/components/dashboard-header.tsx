import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, FolderPlus, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="w-full max-w-md">
        <Input placeholder="Buscar pesquisas..." className="max-w-md" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Minha Conta</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <FolderPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Nova Pasta</span>
        </Button>
        <Link href="/nova-pesquisa">
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Nova Pesquisa</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
