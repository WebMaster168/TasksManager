export type TaskStatus = 'start' | 'process' | 'complete'

export interface Task {
  id: string
  completed: TaskStatus
  text: string
  deadline: string
  deadlineAt?: number
}
