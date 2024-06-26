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

    const getTopicById = async (idTopic) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/temas/${idTopic}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (data.response) {
                setSelectedTopic(data.response)
            } else {
                console.error('La respuesta no contiene un tema por id:', data)
            }
        } catch (error) {
            console.error('Error al obtener un tema por id:', error)
        }
    }


    const handleChangeTopic = (e) => {
        const topicId = e.target.value;
        const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
        setSelectedTopic(selectedTopic);
    }

    return { topics, getTopics, handleChangeTopic, getTopicById, selectedTopic }
}
