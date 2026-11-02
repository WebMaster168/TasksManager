import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="task-item" {...attributes} {...listeners}>
      <div className="task-item__main-container">
        <div className="task-item__main-content">
          <span className="task-item__text">{task.text}</span>
          {task.deadline && <p className="task-item__deadline">| ДО: {task.deadline}</p>}
        </div>
        <button
          className="task-item__delete-button default-button delete-button"
          onPointerDown={event => event.stopPropagation()}
          onClick={event => { event.stopPropagation(); onDelete(task.id) }}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}
