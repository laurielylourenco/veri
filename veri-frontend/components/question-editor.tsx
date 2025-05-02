"use client"

import type React from "react"

import { CheckSquare, Type, Star, Calendar, FileUp, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { Question } from "@/types/survey"
import { MultipleChoiceEditor } from "@/components/question-editors/multiple-choice-editor"
import { RatingEditor } from "@/components/question-editors/rating-editor"

interface QuestionEditorProps {
  question: Question
  onUpdateQuestion: (question: Question) => void
}

export function QuestionEditor({ question, onUpdateQuestion }: QuestionEditorProps) {
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <CheckSquare className="h-5 w-5" />
      case "text":
        return <Type className="h-5 w-5" />
      case "rating":
        return <Star className="h-5 w-5" />
      case "date":
        return <Calendar className="h-5 w-5" />
      case "upload":
        return <FileUp className="h-5 w-5" />
      case "yes_no":
        return <Eye className="h-5 w-5" />
      default:
        return <CheckSquare className="h-5 w-5" />
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuestion({
      ...question,
      title: e.target.value,
    })
  }

  const handleRequiredChange = (checked: boolean) => {
    onUpdateQuestion({
      ...question,
      required: checked,
    })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateQuestion({
      ...question,
      description: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {getQuestionIcon(question.type)}
        <h2 className="text-lg font-medium">{getQuestionTypeLabel(question.type)}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-title">Título da pergunta</Label>
          <Input
            id="question-title"
            placeholder="Digite o título da pergunta..."
            value={question.title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question-description">Descrição (opcional)</Label>
          <Textarea
            id="question-description"
            placeholder="Adicione uma descrição para esta pergunta..."
            value={question.description || ""}
            onChange={handleDescriptionChange}
          />
        </div>

        {question.type === "multiple_choice" && (
          <MultipleChoiceEditor
            options={question.options || []}
            onUpdateOptions={(options) => onUpdateQuestion({ ...question, options })}
          />
        )}

        {question.type === "rating" && (
          <RatingEditor
            maxRating={question.maxRating || 5}
            onUpdateMaxRating={(maxRating) => onUpdateQuestion({ ...question, maxRating })}
          />
        )}

        <div className="flex items-center space-x-2 pt-4">
          <Switch id="question-required" checked={question.required} onCheckedChange={handleRequiredChange} />
          <Label htmlFor="question-required">Pergunta obrigatória</Label>
        </div>
      </div>
    </div>
  )
}
