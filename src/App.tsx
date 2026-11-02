import { useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { Board } from './components/Board'
import { DeadlineModal } from './components/DeadlineModal'
import { DeleteModal } from './components/DeleteModal'
import { useTasks } from './hooks/useTasks'
import './index.css'

function App() {
  const { tasks, addTask, deleteTask, moveTask } = useTasks()
  const [deadlineOpen, setDeadlineOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [pendingText, setPendingText] = useState('')
  const [dark, setDark] = useState(true)

  const requestCreate = (text: string) => {
    setPendingText(text)
    setDeadlineOpen(true)
  }

  const createWithDeadline = (deadline: string, deadlineAt?: number) => {
    addTask(pendingText, deadline, deadlineAt)
    setPendingText('')
    setDeadlineOpen(false)
  }
  /*
  <aside className="sidebar">
        <div className="brand-mark">✓</div>
        <nav className="sidebar__nav" aria-label="Навигация">
          <button className="sidebar__item sidebar__item--active" aria-label="Задачи">⌂</button>
          <button className="sidebar__item" aria-label="Список задач">☷</button>
          <button className="sidebar__item" aria-label="Календарь">□</button>
          <button className="sidebar__item" aria-label="Настройки">⚙</button>
        </nav>
      </aside>

  */
  return (
    <div className={dark ? 'app dark' : 'app'}>
      
      <div className="app-shell">
        <header className="main-navigation">
          <div className="brand">
            <div className="brand__icon">✓</div>
            <span className="brand__title">Task manager</span>
            <span className="brand__divider" />
            <span className="brand__subtitle">Управление задачами</span>
          </div>
          <div className="header-actions">
            <button className="theme-button" onClick={() => setDark(value => !value)} aria-label="Переключить тему">
              <span>{dark ? '☾' : '☀'}</span>
            </button>
            <button className="settings-button" aria-label="Настройки">⚙</button>
          </div>
        </header>

        <main id="tasks">
          <div className="tasks__wrapper">
            <div className="page-intro">
              <div>
                <h1>Мои задачи</h1>
                <p>Перетаскивайте задачи между колонками, чтобы изменить их статус.</p>
              </div>
              <span className="task-count">{tasks.length} {tasks.length === 1 ? 'задача' : 'задач'}</span>
            </div>

            <TaskForm existingTitles={tasks.map(task => task.text)} onSubmit={requestCreate} />
            <Board tasks={tasks} onMove={moveTask} onDelete={setDeleteId} />
          </div>
        </main>
      </div>

      <DeadlineModal
        open={deadlineOpen}
        onClose={() => { setDeadlineOpen(false); setPendingText('') }}
        onSet={createWithDeadline}
      />

      <DeleteModal
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteTask(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}

export default App
