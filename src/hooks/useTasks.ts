import { useEffect, useState } from 'react'
import type { Task, TaskStatus } from '../types/task'

const STORAGE_KEY = 'task-manager-tasks'

const readLocalTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Task[]) : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(readLocalTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text: string, deadline: string, deadlineAt?: number) => {
    const task: Task = {
      id: String(Date.now()),
      completed: 'start',
      text,
      deadline,
      deadlineAt,
    }
    setTasks(prev => [...prev, task])
    return task
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: status } : task))
  }

  const reorderTasks = (activeId: string, overId: string) => {
    setTasks(prev => {
      const oldIndex = prev.findIndex(task => task.id === activeId)
      const newIndex = prev.findIndex(task => task.id === overId)
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev
      const result = [...prev]
      const [moved] = result.splice(oldIndex, 1)
      result.splice(newIndex, 0, moved)
      return result
    })
  }

  return { tasks, addTask, deleteTask, moveTask, reorderTasks }
}
