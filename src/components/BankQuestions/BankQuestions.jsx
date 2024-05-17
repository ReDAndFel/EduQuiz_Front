import "./BankQuestions.css"
import SelectComponent from "../SelectComponent/SelectComponent";
import { useQuestion } from "../../hooks/useQuestion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnswer } from "../../hooks/useAnswer";

const BankQuestions = () => {
    const { state } = useLocation();
    const { data } = state || {};
    const { questions, handleQuestionClick, getQuestionByTopicId, selectedQuestion } = useQuestion()
    const { answers, getAnswerByIdQuestion } = useAnswer()
    const [bankQuestion, setBankQuestion] = useState({})

    const navigate = useNavigate();
    const idTema = data.idTema

    useEffect(() => {
        getQuestionByTopicId(idTema)
    }, [])

    useEffect(() => {
        getAnswerByIdQuestion(selectedQuestion.id)
    }, [selectedQuestion])

    const handleClick = () => {
        const updateForm = {
            ...data,
            preguntas: [
                ...(data.preguntas || []),
                {
                    enunciado: selectedQuestion.enunciado,
                    idEstado: selectedQuestion.idestado.id,
                    idTema: selectedQuestion.idtema.id,
                    idTipoPregunta: selectedQuestion.idtipopregunta.id,
                    respuestas: answers.map((answer) => ({
                        opcionrespuesta: answer.opcionrespuesta,
                        correcta: answer.correcta,
                    })),
                },
            ],
        };
        navigate("/preguntas", { state: { updateForm } });
    };

    return (
        <div className="bank-questions-container">
            <h3>Elige una de las preguntas del banco de preguntas</h3>
            <SelectComponent
                list={questions}
                onChange={handleQuestionClick}
                defaultValue={selectedQuestion}
                firstOption="Seleccione una pregunta"
                disable={false}
                elementValue={"enunciado"}
            />
            <button onClick={handleClick}>Guardar pregunta</button>
        </div>
    )
}

export default BankQuestions