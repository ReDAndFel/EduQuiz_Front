import { useState } from "react"

export const useAnswer = () => {

    const [answers, setAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()

    const getAnswerByIdQuestion = async (idQuestion) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/respuestas/pregunta/${idQuestion}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setAnswers(data.response)
            } else {
                console.error('La respuesta no contiene un array de respuestas por pregunta:', data)
            }
        } catch (error) {
            console.error('Error al obtener las respuestas por pregunta:', error)
        }
    }

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    }

    return { answers, handleAnswerClick, getAnswerByIdQuestion, selectedAnswer }
}