export type QuestionType = "multiple_choice" | "text" | "rating" | "date" | "upload" | "yes_no"

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: string[]
  maxRating?: number
}

export interface Survey {
  id: string
  title: string
  description: string
  questions: Question[]
}
