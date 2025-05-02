"use client"

import { Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RatingEditorProps {
  maxRating: number
  onUpdateMaxRating: (maxRating: number) => void
}

export function RatingEditor({ maxRating, onUpdateMaxRating }: RatingEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Escala de avaliação</Label>
        <RadioGroup
          value={maxRating.toString()}
          onValueChange={(value) => onUpdateMaxRating(Number.parseInt(value))}
          className="mt-2 flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="r5" />
            <Label htmlFor="r5" className="flex items-center gap-1">
              5 <Star className="h-3 w-3 fill-current" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10" id="r10" />
            <Label htmlFor="r10" className="flex items-center gap-1">
              10 <Star className="h-3 w-3 fill-current" />
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-1 pt-2">
        <div className="flex">
          {Array.from({ length: maxRating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-gray-500">Visualização</span>
      </div>
    </div>
  )
}
