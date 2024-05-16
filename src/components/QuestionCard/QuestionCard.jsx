import { useEffect } from "react"
import "./QuestionCard.css"


const QuestionCard = ({ currentQuestion, answers, selectedAnswers, setSelectedAnswers }) => {
    const currentQuestionQuestionInfo = currentQuestion[0]
    const currentQuestionAsignInfo = currentQuestion[1]

    useEffect(() => {
        console.log("currentQuestionAsignInfo:")
        console.log(currentQuestionAsignInfo)

    }, [])

    const handleAnswerChange = (answerId, isChecked, opcionrespuesta) => {
        setSelectedAnswers((prevSelectedAnswers, index) => {
            const idAsignacionPregunta = currentQuestionAsignInfo.id
            const updatedSelectedAnswers = { ...prevSelectedAnswers }

            if (currentQuestionQuestionInfo.idtipopregunta.id === 1) {
                // Pregunta de múltiple selección

                if (isChecked) {
                    // Agregar la respuesta seleccionada al objeto de respuestas seleccionadas
                    updatedSelectedAnswers[answerId] = { idRespuesta: answerId, idAsignacionPregunta, respuesta: opcionrespuesta };
                } else {
                    // Eliminar la respuesta seleccionada si se desmarca
                    delete updatedSelectedAnswers[answerId];
                }

                return updatedSelectedAnswers;
            } else if (currentQuestionQuestionInfo.idtipopregunta.id === 2 || currentQuestionQuestionInfo.idtipopregunta.id === 3) {
                // Pregunta de única selección
                return isChecked
                    ? [{ idRespuesta: answerId, idAsignacionPregunta, respuesta: opcionrespuesta }]
                    : [];
            }
        });
    };

    return (
        <div className="question-card">
            <h3>{currentQuestionQuestionInfo && currentQuestionQuestionInfo.enunciado}</h3>
            {answers.map((answer) => (
                <div className="answers-container" key={answer.id}>
                    {currentQuestionQuestionInfo.idtipopregunta.id === 2 || currentQuestionQuestionInfo.idtipopregunta.id === 3 ? (
                        <label>
                            <input
                                type="radio"
                                checked={Object.values(selectedAnswers).some(
                                    (selectedAnswer) => selectedAnswer.idRespuesta === answer.id
                                )}
                                onChange={(e) => handleAnswerChange(answer.id, e.target.checked, answer.opcionrespuesta)}
                            />
                            {answer.opcionrespuesta}
                        </label>
                    ) : (
                        <label>
                            <input
                                type="checkbox"
                                name={`question-${currentQuestionQuestionInfo.id}`}
                                value={answer.id}
                                checked={Object.values(selectedAnswers).some(
                                    (selectedAnswer) => selectedAnswer.idRespuesta === answer.id
                                )}
                                onChange={() => handleAnswerChange(answer.id, true, answer.opcionrespuesta)}
                            />
                            {answer.opcionrespuesta}
                        </label>
                    )}
                </div>
            ))}

        </div>
    )
};

export default QuestionCard