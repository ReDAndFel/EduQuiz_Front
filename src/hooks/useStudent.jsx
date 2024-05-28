import { useState } from "react"
export const useStudent = () => {

    const [listStudents, setListStudents] = useState([])
    const [selectedStudent, setSelectedStudent] = useState()

    const getStudentsByIdCourse = async (idCourse) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/estudiantes/curso/${idCourse}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setListStudents(data.response)
            } else {
                console.error('La respuesta no contiene un array de estudiantes por curso:', data)
            }
        } catch (error) {
            console.error('Error al obtener los estudiantes por curso:', error)
        }
    }

    const handleChangeStudent = (e) => {
        const studentId = e.target.value;
        const selectedStudent = listStudents.find(student => student.id === parseInt(studentId));
        setSelectedStudent(selectedStudent)
    }

    return { getStudentsByIdCourse, handleChangeStudent, selectedStudent, listStudents }
}