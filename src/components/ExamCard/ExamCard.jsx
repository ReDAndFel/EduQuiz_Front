import "./ExamCard.css"
import DeleteIcon from "../../../public/icons/delete_icon/DeleteIcon"

const ExamCard = ({ exam, onDelete }) => {

    return (
        <div className="exam-card-container">
            {exam.estado === "Borrador" && (
                <button onClick={()=>onDelete(exam)} className="delete-exam-button">
                    <DeleteIcon />
                </button>
            )}
            {exam.titulo}
            
        </div>
    )
}

export default ExamCard
