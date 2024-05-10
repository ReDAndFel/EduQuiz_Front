import { useState } from "react"
import "./QuestionManagement.css"
import { useLocation, useNavigate } from "react-router-dom"

const QuestionManagement = () => {

    const navigate = useNavigate()
    const { state } = useLocation();
    const { updateForm } = state
    const [data, setData] = useState(updateForm || {});

    const handleAddQuestion = () => {
        navigate('/agregar-pregunta', { state: { data } });
    };


    const handleSaveQuetions = () => {
        console.log("Data definitiva de examen:")
        console.log(data)
    }

    return (
        <div className="question-management-container">
            <h1>Preguntas</h1>
            <h3>Titulo:{data.titulo}</h3>
            <h3>Curso: {data.curso.nombrecurso}</h3>
            <h3>Tema: {data.tema.nombre}</h3>
            <div className="questions-container">
                {data.preguntas ? (
                    data.preguntas.map((question, index) => (
                        <div key={index} className="question-card">
                            <h3>{question.enunciado}</h3>
                            <ol type="A">
                                {question.respuestas.map((answer, answerIndex) => (
                                    <li key={answerIndex}>
                                        {answer.opcionrespuesta}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))
                ) : (
                    <p>No hay preguntas disponibles</p>
                )}
            </div>

            <button onClick={handleAddQuestion}>Agregar pregunta</button>
            <button onClick={handleSaveQuetions}>Guardar preguntas</button>
        </div>
    )
}

export default QuestionManagement