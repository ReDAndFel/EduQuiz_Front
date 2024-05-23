import "./ExamCard.css"
import DeleteIcon from "../../../public/icons/delete_icon/DeleteIcon"

const ExamCard = ({ exam, onDelete, onClick }) => {

    const handleDeleteClick = (event) => {
        event.stopPropagation(); // Detiene la propagación del evento onClick al contenedor
        onDelete(exam);
    };

    return (
        <div className="exam-card-container" onClick={() => onClick(exam)}>
            {exam.estado === "Borrador" && (
                <button onClick={handleDeleteClick} className="delete-exam-button">
                    <DeleteIcon />
                </button>
            )}
            {exam.titulo}

        </div>
    )
}

export default ExamCard
