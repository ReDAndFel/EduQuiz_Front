import { useState } from "react"

export const useQuestion = () => {

    const [questions, setQuestions] = useState([])
    const [selectedQuestion, setSelectedQuestion] = useState({})

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

    const getQuestionByTopicId = async (idTopic) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/preguntas/tema/${idTopic}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setQuestions(data.response)
            } else {
                console.error('La respuesta no contiene un array de preguntas por tema:', data)
            }
        } catch (error) {
            console.error('Error al obtener las preguntas por tema:', error)
        }
    }

    const handleQuestionClick = (e) => {
        const questionId = e.target.value;
        const selectedQuestion = questions.find(question => question.id === parseInt(questionId));
        setSelectedQuestion(selectedQuestion)
    }

    return { questions, handleQuestionClick, getQuestionByExamIdAndIdStudent, getQuestionByTopicId, selectedQuestion }
}