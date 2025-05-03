import { ChevronRight, Folder } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SurveyList() {
  return (
    <div className="space-y-6">
      {/* Primeira pasta */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 py-4">
          <Folder className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg">Pesquisas de Satisfação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <div className="rounded-md border p-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Satisfação dos Funcionários 2025</h3>
                <Badge variant="success" className="bg-green-100 text-green-800">
                  Ativo
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-md border p-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Avaliação de Ambiente de Trabalho</h3>
                <Badge variant="warning" className="bg-yellow-100 text-yellow-800">
                  Rascunho
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segunda pasta */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 py-4">
          <Folder className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg">Feedback de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <div className="rounded-md border p-3 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Avaliação de Produto</h3>
                <Badge variant="success" className="bg-green-100 text-green-800">
                  Ativo
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
