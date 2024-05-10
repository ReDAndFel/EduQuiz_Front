import { useState } from "react";

export const useTopic = () => {
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    // Aquí harías la petición a la base de datos para obtener los cursos
    const getTopics = async () => {
        try {
            const respuesta = await fetch('http://localhost:8084/temas/')
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setTopics(data.response)
            } else {
                console.error('La respuesta no contiene un array de temas:', data)
            }
        } catch (error) {
            console.error('Error al obtener los temas:', error)
        }
    }


    const handleChangeTopic = (e) => {
        setSelectedTopic(e.target.value)
    }

    return { topics, getTopics, handleChangeTopic, selectedTopic }
}
