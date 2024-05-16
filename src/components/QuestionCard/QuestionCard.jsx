import { useEffect } from "react"
import "./QuestionCard.css"


const QuestionCard = ({ currentQuestion, answers, selectedAnswers, setSelectedAnswers }) => {
    const currentQuestionQuestionInfo = currentQuestion[0]
    const currentQuestionAsignInfo = currentQuestion[1].idasignacionestudiante

    useEffect(() => {
        console.log("currentQuestionQuestionInfo:")
        console.log(currentQuestionQuestionInfo)
    })

    const handleAnswerChange = (answerId, isChecked) => {
        setSelectedAnswers((prevSelectedAnswers) => {
            const questionId = currentQuestionQuestionInfo.id;
            const idAsignacionPregunta = currentQuestionAsignInfo.id;
            const existingAnswers = prevSelectedAnswers[questionId] || [];

            if (currentQuestionQuestionInfo.idtipopregunta.id === 1 || currentQuestionQuestionInfo.idtipopregunta.id === 3) {
                // Pregunta de múltiple selección
                if (isChecked) {
                    return {
                        ...prevSelectedAnswers,
                        [questionId]: [
                            ...existingAnswers,
                            { idRespuesta: answerId, idAsignacionPregunta },
                        ],
                    };
                } else {
                    return {
                        ...prevSelectedAnswers,
                        [questionId]: existingAnswers.filter(
                            (answer) => answer.idRespuesta !== answerId
                        ),
                    };
                }
            } else {
                // Pregunta de única selección
                return {
                    ...prevSelectedAnswers,
                    [questionId]: isChecked
                        ? [{ idRespuesta: answerId, idAsignacionPregunta }]
                        : [],
                };
            }
        });
    };
    return (
        <div className="question-card">
            <h3>{currentQuestionQuestionInfo && currentQuestionQuestionInfo.enunciado}</h3>
            {answers.map((answer) => (
                <div className="answers-container" key={answer.id}>
                    {currentQuestionQuestionInfo.idtipopregunta.id === 1 || currentQuestionQuestionInfo.idtipopregunta.id === 3 ? (
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedAnswers[currentQuestionQuestionInfo.id]?.includes(answer.id) || false}
                                onChange={(e) => handleAnswerChange(answer.id, e.target.checked)}
                            />
                            {answer.opcionrespuesta}
                        </label>
                    ) : (
                        <label>
                            <input
                                type="radio"
                                name={`question-${currentQuestionQuestionInfo.id}`}
                                value={answer.id}
                                checked={selectedAnswers[currentQuestionQuestionInfo.id] === answer.id}
                                onChange={() => handleAnswerChange(answer.id, true)}
                            />
                            {answer.opcionrespuesta}
                        </label>
                    )}
                </div>
            ))}

        </div>
    )
}

export default QuestionCard