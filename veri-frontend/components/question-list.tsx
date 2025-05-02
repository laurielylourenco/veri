"use client"

import { CheckSquare, Type, Star, Calendar, FileUp, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Question } from "@/types/survey"

interface QuestionListProps {
  questions: Question[]
  selectedQuestionId: string | null
  onSelectQuestion: (id: string) => void
  onDeleteQuestion: (id: string) => void
}

export function QuestionList({ questions, selectedQuestionId, onSelectQuestion, onDeleteQuestion }: QuestionListProps) {
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <CheckSquare className="h-4 w-4" />
      case "text":
        return <Type className="h-4 w-4" />
      case "rating":
        return <Star className="h-4 w-4" />
      case "date":
        return <Calendar className="h-4 w-4" />
      case "upload":
        return <FileUp className="h-4 w-4" />
      case "yes_no":
        return <Eye className="h-4 w-4" />
      default:
        return <CheckSquare className="h-4 w-4" />
    }
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return "Múltipla Escolha"
      case "text":
        return "Texto"
      case "rating":
        return "Avaliação"
      case "date":
        return "Data"
      case "upload":
        return "Upload"
      case "yes_no":
        return "Sim/Não"
      default:
        return "Pergunta"
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
        <p>Nenhuma pergunta ainda — clique em um tipo de pergunta ao lado para começar.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {questions.map((question) => (
        <div
          key={question.id}
          className={`group flex items-center justify-between rounded-md border p-3 hover:bg-gray-50 ${
            selectedQuestionId === question.id ? "border-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => onSelectQuestion(question.id)}
        >
          <div className="flex items-center gap-2">
            {getQuestionIcon(question.type)}
            <span className="text-sm">{question.title || getQuestionTypeLabel(question.type)}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteQuestion(question.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
