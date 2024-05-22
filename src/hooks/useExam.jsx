import { useState } from "react"

export const useExam = () => {
    const [exams, setExams] = useState([])
    const [selectedExam, setSelectedExam] = useState()

    const getExamsByStudent = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/examenes/estudiante/${id}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setExams(data.response)
            } else {
                console.error('La respuesta no contiene un array de examenes por estudiante:', data)
            }
        } catch (error) {
            console.error('Error al obtener los examenes por estudiante:', error)
        }
    }

    const getExamsByCourse = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/examenes/curso/${id}`)
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud')
            }
            const data = await respuesta.json()
            if (Array.isArray(data.response)) {
                setExams(data.response)
            } else {
                console.error('La respuesta no contiene un array de examenes por curso:', data)
            }
        } catch (error) {
            console.error('Error al obtener los examenes por curso:', error)
        }
    }

    const handleExamClick = (exam) => {
        setSelectedExam(exam);
    }

    return {exams, handleExamClick, getExamsByStudent,getExamsByCourse, selectedExam}
}