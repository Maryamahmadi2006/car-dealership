import Modal from './Modal';

export default function ConfirmDialog({
  open,
  title,
  text,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button type="button" className="btn btn--pill modal-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--pill modal-btn modal-btn--danger"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p>{text}</p>
    </Modal>
  );
}
