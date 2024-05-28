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

    const createAsign = async (asign) =>{
        try {
            const response = await fetch('http://localhost:8084/asignacion-estudiantes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(asign),
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log('Asignacion Estudiante guardado exitosamente:', responseData)
            } else {
                console.error('Error al guardar la Asignacion Estudiante:', response.status)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }


    return { getAsignStudentByIdStudentAndIdExam, createAsign, asignStudent }
}