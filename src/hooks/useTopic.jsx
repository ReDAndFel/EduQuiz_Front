import { useEffect, useState } from "react";

export const useTopic = () => {
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getTopics = async () => {
            // const respuesta = await fetch('/universidades')
            //const datos = await respuesta.json()
            const data = [
                {
                    id: 1,
                    descripcion: "Introduccion a las bases de datos"
                },
                {
                    id: 2,
                    descripcion: "PLSQL"
                }
            ]
            setTopics(data)
        };
        getTopics()
    }, []);

    const handleChangeTopic = (e) => {
        setSelectedTopic(e.target.value)
    }

    return { topics, handleChangeTopic, selectedTopic }
}