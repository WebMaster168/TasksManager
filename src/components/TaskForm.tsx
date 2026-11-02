import { FormEvent, useState } from 'react'

interface TaskFormProps {
  existingTitles: string[]
  onSubmit: (text: string) => void
}

export function TaskForm({ existingTitles, onSubmit }: TaskFormProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = value.trim()

    if (!text) {
      setError('Название задачи не должно быть пустым')
      return
    }
    if (existingTitles.includes(text)) {
      setError('Задача с таким названием уже существует')
      return
    }

    setError('')
    onSubmit(text)
    setValue('')
  }

  return (
    <form className="create-task-block" onSubmit={submit}>
      <input
        className="create-task-block__input default-text-input"
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Создайте новую задачу"
      />
      <button type="submit" className="create-task-block__button default-button">
        Создать
      </button>
      {error && <span className="error-message-block">{error}</span>}
    </form>
  )
}
