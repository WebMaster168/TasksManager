interface DeleteModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteModal({ open, onCancel, onConfirm }: DeleteModalProps) {
  if (!open) return null
  return (
    <div className="modal-overlay" onMouseDown={event => event.target === event.currentTarget && onCancel()}>
      <div className="delete-modal">
        <h3 className="delete-modal__question">Вы действительно хотите удалить эту задачу?</h3>
        <div className="delete-modal__buttons">
          <button className="delete-modal__button delete-modal__cancel-button" onClick={onCancel}>Отмена</button>
          <button className="delete-modal__button delete-modal__confirm-button" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </div>
  )
}
