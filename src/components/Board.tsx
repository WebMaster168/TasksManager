import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import type { Task, TaskStatus } from '../types/task'
import { TaskColumn, labels } from './TaskColumn'

interface BoardProps {
  tasks: Task[]
  onMove: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

function findStatus(tasks: Task[], id: string): TaskStatus | undefined {
  const task = tasks.find(item => item.id === id)
  return task?.completed
}

export function Board({ tasks, onMove, onDelete }: BoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => setDraggingId(String(event.active.id))

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingId(null)
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const destination = ['start', 'process', 'complete'].includes(overId)
      ? overId as TaskStatus
      : findStatus(tasks, overId)

    if (destination) onMove(activeId, destination)
  }

  const activeTask = draggingId ? tasks.find(task => task.id === draggingId) : undefined

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="categories">
      <div className="categories__item start">
        <span className="category-title">{labels.start}</span>

        <span className="category-count">
          {tasks.filter(
            task => task.completed === 'start'
          ).length}
        </span>
      </div>

      <div className="categories__item progress">
        <span className="category-title">{labels.process}</span>

        <span className="category-count">
          {tasks.filter(
            task => task.completed === 'process'
          ).length}
        </span>
      </div>

      <div className="categories__item done">
        <span className="category-title">{labels.complete}</span>

        <span className="category-count">
          {tasks.filter(
            task => task.completed === 'complete'
          ).length}
        </span>
</div>
      </div>
      <div className="tasks-list">
        <TaskColumn status="start" tasks={tasks.filter(task => task.completed === 'start')} onDelete={onDelete} />
        <TaskColumn status="process" tasks={tasks.filter(task => task.completed === 'process')} onDelete={onDelete} />
        <TaskColumn status="complete" tasks={tasks.filter(task => task.completed === 'complete')} onDelete={onDelete} />
      </div>
      <DragOverlay>
        {activeTask ? <div className={`task-item ${activeTask.completed}`}><div className="task-item__text">{activeTask.text}</div></div> : null}
      </DragOverlay>
    </DndContext>
  )
}

