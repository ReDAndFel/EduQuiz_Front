import "./ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, questionConfirm}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{questionConfirm}</h3>
        <button onClick={onConfirm} className="confirm-button">Confirmar</button>
        <button onClick={onClose} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
