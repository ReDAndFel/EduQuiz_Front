import { useState } from "react"
export const useAsignQuestion = () => {

    const [listAsignQuestion, setListAsignQuestion] = useState([])

    const getAsignQuestionByIdAsignStudent = async (idAsignStudent) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/asignacion-preguntas/asignacion-estudiante/${idAsignStudent}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            setListAsignQuestion(data.response)

        } catch (error) {
            console.error('Error al obtener las asignacion estudiantes por id estudiante y id examen:', error)
        }
    }


    return { getAsignQuestionByIdAsignStudent, listAsignQuestion }
}