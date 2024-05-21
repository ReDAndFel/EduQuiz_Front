import { useState } from "react"
import "./QuestionManagement.css"
import { useLocation, useNavigate } from "react-router-dom"

const QuestionManagement = () => {

    const navigate = useNavigate()
    const { state } = useLocation();
    const { updateForm } = state
    const [data, setData] = useState(updateForm);
    const maxQuestions = data.cantidadPreguntas
    const [preguntas, setPreguntas] = useState(data.preguntas)
    const [preguntasLength, setPreguntasLength] = useState(preguntas.length)

    const handleAddQuestion = () => {
        navigate('/tipo-pregunta', { state: { data } });
    };

    const handleAddQuestionToBank = () => {
        navigate('/banco-preguntas', { state: { data } });
    };


    const handleSaveQuetions = async () => {
        console.log("Data definitiva de examen:")
        console.log(data)
        try {
            const response = await fetch('http://localhost:8084/examenes/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
            if (response.ok) {
              const responseData = await response.json();
              console.log('Examen guardado exitosamente:', responseData);
            } else {
              console.error('Error al guardar el examen:', response.status);
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        
    }

    return (
        <div className="question-management-container">
            <h2>Crear preguntas del examen</h2>
            <p><strong>Titulo: </strong>{data.titulo}</p>
            <p><strong>Curso: </strong>{data.curso.nombrecurso}</p>
            <p><strong>Tema: </strong>{data.tema.nombre}</p>
            <p><strong>Fecha: </strong>{data.fecha}</p>
            <p><strong>Hora Inicio: </strong>{data.horaInicio}</p>
            <p><strong>Hora Fin: </strong>{data.horaFin}</p>
            <p><strong>Cantidad maximo de preguntas: </strong>{maxQuestions}</p>

            <div className="questions-container">

                {preguntasLength > 0 ? (
                    <>
                        <ol type="1">
                            {preguntas.map((question, index) => (
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
                        {preguntasLength < maxQuestions && <p>Aun quedan {maxQuestions - preguntasLength} pregunta(s) por agregar, siga agregando preguntas o guarde el examen para que se asignen las preguntas restante automaticamente</p>
                        }                    </>


                ) : (
                    <p>No hay preguntas disponibles. Presione Agregar pregunta para crear una pregunta a su gusto, Agregar pregunta del banco para elegir una de las preguntas del banco o guarde el examen para que se asignen preguntas aleatoriamente</p>
                )}
            </div>

            {maxQuestions > preguntas.length &&
                <>
                    <button onClick={handleAddQuestion}>Agregar pregunta</button>
                    <button onClick={handleAddQuestionToBank}>Agregar pregunta del banco</button>
                </>

            }
            <button onClick={handleSaveQuetions}>Guardar Examen</button>
        </div>
    )
}

export default QuestionManagement