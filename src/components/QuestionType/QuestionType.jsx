import "./QuestionType.css"
import "../../hooks/useQuestionType"
import { useQuestionType } from "../../hooks/useQuestionType"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const QuestionType = () => {
    const { state } = useLocation();
    const { data } = state || {}
    const navigate = useNavigate()
    const { types, handleTypeClick, selectedQuestionType } = useQuestionType()

    useEffect(() => {
        if (selectedQuestionType) navigate(`/agregar-pregunta-${selectedQuestionType.descripcion}`, { state: { data, selectedQuestionType } })

    }, [selectedQuestionType])

    return (
        <div className="question-type-container">
            <h3>Seleccione un tipo de pregunta</h3>
            <div className="types-container">
                {types.map((type) => (
                    <div className="type-container" key={type.idTipoPregunta} onClick={() => handleTypeClick(type)}>
                        {type.descripcion}
                    </div>
                ))}
            </div>

        </div>
    )

}

export default QuestionType