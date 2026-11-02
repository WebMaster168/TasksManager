import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Task, TaskStatus } from '../types/task'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  status: TaskStatus
  tasks: Task[]
  onDelete: (id: string) => void
}

const labels: Record<TaskStatus, string> = {
  start: 'Ожидает выполнения',
  process: 'В процессе',
  complete: 'Выполнено',
}

export function TaskColumn({ status, tasks, onDelete }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div ref={setNodeRef} className={`placeholder ${status} ${isOver ? 'drop-over' : ''}`}>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => <TaskCard key={task.id} task={task} onDelete={onDelete} />)}
      </SortableContext>
      {tasks.length === 0 && <div className="empty-column">Перетащите задачу сюда</div>}
    </div>
  )
}

export { labels }
