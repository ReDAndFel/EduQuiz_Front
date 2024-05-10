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
            <h2>Crear preguntas del examen</h2>
            <p><strong>Titulo: </strong>{data.titulo}</p>
            <p><strong>Curso: </strong>{data.curso.nombrecurso}</p>
            <p><strong>Tema: </strong>{data.tema.nombre}</p>
            <div className="questions-container">

                {data.preguntas ? (
                    <ol type="1">
                        {data.preguntas.map((question, index) => (
                            <li key={index} className="question-card">
                                <label>{question.enunciado}</label>
                                <ol type="A">
                                    {question.respuestas.map((answer, answerIndex) => (
                                        <li key={answerIndex}>
                                            {answer.opcionrespuesta}
                                        </li>
                                    ))}
                                </ol>
                            </li>
                        ))}
                    </ol>

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