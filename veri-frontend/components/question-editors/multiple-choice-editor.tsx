"use client"
import { Grip, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MultipleChoiceEditorProps {
  options: string[]
  onUpdateOptions: (options: string[]) => void
}

export function MultipleChoiceEditor({ options, onUpdateOptions }: MultipleChoiceEditorProps) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    onUpdateOptions(newOptions)
  }

  const addOption = () => {
    onUpdateOptions([...options, `Opção ${options.length + 1}`])
  }

  const removeOption = (index: number) => {
    if (options.length <= 1) return
    const newOptions = options.filter((_, i) => i !== index)
    onUpdateOptions(newOptions)
  }

  return (
    <div className="space-y-4">
      <Label>Opções</Label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Grip className="h-4 w-4 text-gray-400" />
            <Input value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
              disabled={options.length <= 1}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={addOption}>
        <Plus className="h-4 w-4" />
        Adicionar opção
      </Button>
    </div>
  )
}
