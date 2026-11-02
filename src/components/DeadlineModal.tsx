import { useState } from 'react'

interface DeadlineModalProps {
  open: boolean
  onClose: () => void
  onSet: (deadline: string, deadlineAt?: number) => void
}

export function DeadlineModal({ open, onClose, onSet }: DeadlineModalProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  if (!open) return null

  const setDeadline = () => {
    const totalMs = ((days * 24 + hours) * 60 + minutes) * 60 * 1000
    if (totalMs === 0) {
      onSet('', undefined)
      return
    }

    const deadlineAt = Date.now() + totalMs
    const deadline = new Date(deadlineAt).toLocaleDateString('ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
      hour: 'numeric', minute: 'numeric',
    })
    onSet(deadline, deadlineAt)
  }

  return (
    <div className="modal-deadline" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div className="modal-deadline__inner">
        <h2 className="modal-deadline__title">Укажите срок выполнения:</h2>
        <div className="modal-deadline__time">
          <TimeInput value={days} setValue={setDays} max={30} label="Дней" />
          <TimeInput value={hours} setValue={setHours} max={23} label="Часов" />
          <TimeInput value={minutes} setValue={setMinutes} max={59} label="Минут" />
        </div>
        <div className="modal-deadline__btns">
          <button className="modal-deadline__set" onClick={setDeadline}>Установить</button>
          <button className="modal-deadline__close" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}

function TimeInput({ value, setValue, max, label }: { value: number; setValue: (value: number) => void; max: number; label: string }) {
  return (
    <div className="modal-deadline__time-item">
      <input type="number" min={0} max={max} value={value} onChange={e => setValue(Math.min(max, Math.max(0, Number(e.target.value))))} />
      <span>{label}</span>
    </div>
  )
}
