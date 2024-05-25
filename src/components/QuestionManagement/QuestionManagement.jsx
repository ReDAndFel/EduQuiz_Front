import { useEffect, useState } from "react"
import "./QuestionManagement.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useExam } from "../../hooks/useExam"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"
import DeleteButton from "../DeleteButton/DeleteButton"

const QuestionManagement = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const { updateForm } = state
    const [data, setData] = useState(updateForm)
    const maxQuestions = data.cantidadpreguntas
    const [preguntas, setPreguntas] = useState(data.preguntas || [])
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState()

    const [preguntasLength, setPreguntasLength] = useState(preguntas.length)
    const estadoExamen = data.estado
    const { createExam, updateExam, handleExamToPublishClick, publishExam, selectedExamToPublish } = useExam()
    const [isModalPublishOpen, setModalPublishOpen] = useState(false)
    const openModalPublish = () => setModalPublishOpen(true)
    const closeModalPublish = () => setModalPublishOpen(false)
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)
    const openModalDelete = () => setModalDeleteOpen(true)
    const closeModalDelete = () => setModalDeleteOpen(false)

    const handleAddQuestion = () => {
        navigate('/tipo-pregunta', { state: { data } })
    }

    const handleAddQuestionToBank = () => {
        navigate('/banco-preguntas', { state: { data } })
    }


    const handleSaveQuetions = async () => {
        console.log("Data definitiva de examen:")
        console.log(data)
        if (data.id) {
            console.log("Examen a actualizar")
            await updateExam(data.id, data)
        } else {
            console.log("Examen a crear")
            await createExam(data)
        }
        navigate("/gestionar-examenes")

    }

    const handleClickPublish = async () => {
        console.log("Data definitiva de examen a publicar:")
        console.log(data)
        openModalPublish()

    }

    const handlePublishExam = async () => {
        await publishExam(data.id)
        navigate("/gestionar-examenes")

    }

    const handleClickDeleteQuestion = async (question) => {
        console.log("Pregunta a eliminar:")
        console.log(question)
        setPreguntaSeleccionada(question)
        openModalDelete()

    }

    const handleDeleteQuestion = () => {
        const updatedQuestions = preguntas.filter(question => question !== preguntaSeleccionada)
        setPreguntas(updatedQuestions)
        closeModalDelete();
    }

    useEffect(() => {
        if (preguntas) setPreguntasLength(preguntas.length)
    }, [preguntas])

    return (
        <div className="question-management-container">
            <h2>Crear preguntas del examen</h2>
            <p><strong>Titulo: </strong>{data.titulo}</p>
            <p><strong>Curso: </strong>{data.curso.nombrecurso}</p>
            <p><strong>Tema: </strong>{data.tema.nombre}</p>
            <p><strong>Fecha: </strong>{data.fecha}</p>
            <p><strong>Hora Inicio: </strong>{data.horaInicio}</p>
            <p><strong>Hora Fin: </strong>{data.horaFin}</p>
            <p><strong>Cantidad de preguntas por examen: </strong>{data.cantidadpreguntasporexamen}</p>
            <p><strong>Cantidad máxima de preguntas: </strong>{maxQuestions}</p>
            <p><strong>Cantidad de preguntas actuales: </strong>{preguntasLength}</p>

            <div className="questions-container">

                {preguntasLength > 0 ? (
                    <div className="questions-list-container">

                        {preguntas.map((question, index) => (
                            <div key={index} className="question-card">
                                <div className="question-content">
                                    <label>{question.enunciado}</label>
                                    <ol type="A">
                                        {question.respuestas.map((answer, answerIndex) => (
                                            <li key={answerIndex}>
                                                {answer.opcionrespuesta}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                {estadoExamen == "Borrador" && <DeleteButton handleClick={() => handleClickDeleteQuestion(question)} />}
                            </div>
                        ))}

                        {preguntasLength < maxQuestions && <p>Aun quedan {maxQuestions - preguntasLength} pregunta(s) por agregar, siga agregando preguntas o guarde los cambios para que se asignen las preguntas restante automaticamente.</p>
                        }
                    </div>


                ) : (
                    <p>No hay preguntas disponibles. Presione Agregar pregunta para crear una pregunta a su gusto, Agregar pregunta del banco para elegir una de las preguntas del banco o guarde los cambios para que se asignen preguntas aleatoriamente.</p>
                )}
            </div>
            {estadoExamen == "Borrador" &&
                <>
                    {maxQuestions > preguntasLength &&
                        <>
                            <button onClick={handleAddQuestion}>Agregar pregunta</button>
                            <button onClick={handleAddQuestionToBank}>Agregar pregunta del banco</button>
                        </>
                    }
                    {preguntasLength <= maxQuestions && <button onClick={handleSaveQuetions}>Guardar cambios</button>}
                    {preguntasLength > maxQuestions && "Debe eliminar preguntas ya que excedio la cantidad de preguntas o devuelvase y cambie la cantidad de preguntas a una mayor."}
                    {maxQuestions == preguntasLength && <button onClick={handleClickPublish}>Publicar</button>}
                </>
            }
            <ConfirmationModal
                questionConfirm={"¿Seguro que desea publicar el examen? Ya no podrá editarlo después y se publicará con los últimos cambios guardados."}
                isOpen={isModalPublishOpen}
                onClose={closeModalPublish}
                onConfirm={handlePublishExam}
            />

            <ConfirmationModal
                questionConfirm={"¿Seguro que desea eliminar la pregunta?"}
                isOpen={isModalDeleteOpen}
                onClose={closeModalDelete}
                onConfirm={handleDeleteQuestion}
            />

        </div>
    )
}

export default QuestionManagement