import { useEffect, useState } from "react"
import "./QuestionManagement.css"
import { useLocation, useNavigate } from "react-router-dom"

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()
    const { state } = useLocation();
    const { selectedUniversity, selectedCourse, selectedGroup, selectedTopic } =
        state || {};

    const handleAddQuestion = () => {
        navigate('/agregar-pregunta', { state: { questions } });
    }

    useEffect(() => {
        if (state?.questions) {
            setQuestions(state.questions);
        }
    }, [state]);

    return (
        <div className="question-management-container">
            <h1>Preguntas</h1>
            <h3>{selectedUniversity}</h3>
            <h3>{selectedCourse}</h3>
            <h3>{selectedGroup}</h3>
            <h3>{selectedTopic}</h3>
            <div className="questions-container">
                {questions.map((question, index) => (
                    <div key={index} className="question-card">
                        <h3>{question.statement}</h3>
                        <ul>
                            {question.answers.map((answer, answerIndex) => (
                                <li key={answerIndex}>
                                    {answer.text} {answer.isCorrect ? '(Correcta)' : '(Incorrecta)'}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <button onClick={handleAddQuestion}>Agregar pregunta</button>
            <button>Guardar preguntas</button>
        </div>
    )
}

export default QuestionManagement