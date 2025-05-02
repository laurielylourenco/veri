"use client"

import { useState } from "react"
import { Eye, Save, CheckSquare, Type, Star, Calendar, FileUp, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { QuestionEditor } from "@/components/question-editor"
import { QuestionList } from "@/components/question-list"
import type { QuestionType, Question } from "@/types/survey"

export function SurveyCreator() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
  const [surveyDescription, setSurveyDescription] = useState("")

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type,
      title: "",
      required: false,
      options: type === "multiple_choice" ? ["Opção 1", "Opção 2", "Opção 3"] : [],
    }

    setQuestions([...questions, newQuestion])
    setSelectedQuestionId(newQuestion.id)
  }

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    if (selectedQuestionId === id) {
      setSelectedQuestionId(null)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Nova Pesquisa</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Eye className="h-4 w-4" />
            <span>Pré-visualizar</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            <span>Salvar</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left column - Question Types */}
        <div className="flex w-64 flex-col border-r bg-gray-50 p-4">
          <h2 className="mb-4 text-sm font-medium text-gray-500">ADICIONAR PERGUNTA</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => addQuestion("multiple_choice")}
            >
              <CheckSquare className="h-4 w-4" />
              <span>Múltipla Escolha</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => addQuestion("text")}>
              <Type className="h-4 w-4" />
              <span>Texto</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => addQuestion("rating")}>
              <Star className="h-4 w-4" />
              <span>Avaliação</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => addQuestion("date")}>
              <Calendar className="h-4 w-4" />
              <span>Data</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => addQuestion("upload")}>
              <FileUp className="h-4 w-4" />
              <span>Upload</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => addQuestion("yes_no")}>
              <EyeIcon className="h-4 w-4" />
              <span>Sim/Não</span>
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="mt-auto">
            <h2 className="mb-2 text-sm font-medium text-gray-500">OBJETIVO DA PESQUISA</h2>
            <Textarea
              placeholder="Descreva o objetivo desta pesquisa..."
              className="min-h-[100px] resize-none"
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Middle column - Question List */}
        <div className="flex w-72 flex-col border-r bg-white p-4">
          <h2 className="mb-4 text-sm font-medium text-gray-500">SUAS PERGUNTAS</h2>
          <QuestionList
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={setSelectedQuestionId}
            onDeleteQuestion={deleteQuestion}
          />
        </div>

        {/* Right column - Question Editor */}
        <div className="flex flex-1 flex-col bg-white p-4">
          {selectedQuestion ? (
            <QuestionEditor question={selectedQuestion} onUpdateQuestion={updateQuestion} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Card className="w-full max-w-md border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">Nenhuma pergunta selecionada</h3>
                  <p className="mb-6 text-sm text-gray-500">Selecione uma pergunta para editar ou adicione uma nova</p>
                  <Button variant="outline" className="gap-2" onClick={() => addQuestion("multiple_choice")}>
                    + Adicionar Pergunta
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
