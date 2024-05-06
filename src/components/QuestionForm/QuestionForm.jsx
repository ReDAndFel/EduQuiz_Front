import { useState } from "react";
import "./QuestionForm.css";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionForm = () => {
    const [statement, setStatement] = useState("");
    const [answers, setAnswers] = useState([{ text: "", isCorrect: false }]);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { questions = [] } = state || {};

    const handleAddAnswer = () => {
        setAnswers([...answers, { text: "", isCorrect: false }]);
    };

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answers];
        newAnswers[index][field] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = { statement, answers };
        navigate("/preguntas", { state: { questions: [...questions, newQuestion] } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Crear pregunta</h1>
            <input
                type="text"
                placeholder="Enunciado"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
            />
            {answers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder={`Respuesta ${index + 1}`}
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                    />
                    <label>
                        Correcta:
                        <input
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(e) =>
                                handleAnswerChange(index, "isCorrect", e.target.checked)
                            }
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddAnswer}>
                Agregar respuesta
            </button>
            <button type="submit">Guardar pregunta</button>
        </form>
    );
};

export default QuestionForm;