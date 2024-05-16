import { useState } from "react"

export const useQuestion = () => {

    const [questions, setQuestions] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState()

    const getQuestionByExamIdAndIdStudent = async (idExam, idStudent) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/preguntas/examen/${idExam}/estudiante/${idStudent}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setQuestions(data.response)
            } else {
                console.error('La respuesta no contiene un array de preguntas por examen:', data)
            }
        } catch (error) {
            console.error('Error al obtener las preguntas por examen:', error)
        }
    }

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    }

    return { questions, handleQuestionClick, getQuestionByExamIdAndIdStudent, selectedQuestion }
}