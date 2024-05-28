import { useState } from "react"
export const useAsignStudent = () => {

    const [asignStudent, setAsignStudents] = useState()
    const [selectedAsignStudent, setSelectedAsignStudent] = useState([])

    const getAsignStudentByIdStudentAndIdExam = async (idStudent, idExam) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/asignacion-estudiantes/estudiante/${idStudent}/examen/${idExam}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            setAsignStudents(data.response)

        } catch (error) {
            console.error('Error al obtener las asignacion estudiantes por id estudiante y id examen:', error)
        }
    }


    return { getAsignStudentByIdStudentAndIdExam, asignStudent }
}