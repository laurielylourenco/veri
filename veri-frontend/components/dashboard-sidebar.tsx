import Link from "next/link"
import { LayoutDashboard, FileQuestion, BarChart, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function DashboardSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-semibold">Sistema de Feedback</h1>
      </div>
      <nav className="flex-1 overflow-auto p-3">
        <ul className="space-y-1">
          <li>
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <FileQuestion className="h-4 w-4" />
                Pesquisas
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart className="h-4 w-4" />
                Relatórios
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-3">
        <Separator className="my-2" />
        <Link href="/" passHref>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </Link>
      </div>
    </aside>
  )
}
