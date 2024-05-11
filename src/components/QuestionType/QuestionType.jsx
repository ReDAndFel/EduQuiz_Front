import "./QuestionType.css"
import "../../hooks/useQuestionType"
import { useQuestionType } from "../../hooks/useQuestionType"

const QuestionType = () => {
    const { types, handleTypeClick, selectedQuestionType } = useQuestionType()
    return (
        <div className="question-type-container">
            <h3>Seleccione un tipo de pregunta</h3>
            <div className="types-container">
                {types.map((type) => (
                    <div className="type-container" key={type.idTipoPregunta}>
                        {type.descripcion}
                    </div>
                ))}
            </div>

        </div>
    )

}

export default QuestionType