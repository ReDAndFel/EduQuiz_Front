import { useEffect, useState } from "react";

export const useStateQuestion = () => {
    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState('')
    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getStateQuestion = async () => {
            try {
                const respuesta = await fetch('http://localhost:8084/estados/')
                if (!respuesta.ok) {
                    throw new Error('No se pudo completar la solicitud')
                }
                const data = await respuesta.json()
                if (Array.isArray(data.response)) {
                    setStates(data.response)
                } else {
                    console.error('La respuesta no contiene un array de tipos de estado:', data)
                }
            } catch (error) {
                console.error('Error al obtener los temas:', error)
            }
        }
        getStateQuestion()
    }, [])


    const handleChangeState = (e) => {
        const stateId = e.target.value;
        const selectedState = states.find(state => state.id === parseInt(stateId));
        setSelectedState(selectedState)
    }

    return { states, handleChangeState, selectedState }
}
