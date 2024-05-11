import { useEffect, useState } from "react";

export const useQuestionType = () => {
    const [types, setTypes] = useState([])
    const [selectedQuestionType, setSelectedQuestionType] = useState('')

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getTypes = async () => {
            try {
                const respuesta = await fetch('http://localhost:8084/tipo-preguntas/')
                if (!respuesta.ok) {
                    throw new Error('No se pudo completar la solicitud')
                }
                const data = await respuesta.json()
                if (Array.isArray(data.response)) {
                    setTypes(data.response)
                } else {
                    console.error('La respuesta no contiene un array de tipos de pregunta:', data)
                }
            } catch (error) {
                console.error('Error al obtener los temas:', error)
            }
        }
        getTypes()
    }, [])

    const handleTypeClick = (type) => {
        setSelectedQuestionType(type);
    }

    return { types, handleTypeClick, selectedQuestionType }
}
