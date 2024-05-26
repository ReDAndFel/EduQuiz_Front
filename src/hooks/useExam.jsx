import { useState } from "react"

export const useExam = () => {
    const [exams, setExams] = useState([])
    const [selectedExam, setSelectedExam] = useState()
    const [selectedExamToDelete, setSelectedExamToDelete] = useState()
    const [selectedExamToPublish, setSelectedExamToPublish] = useState()


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

    const deleteExam = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/examenes/${id}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) {
                const data = await respuesta.json()
                throw new Error('No se pudo completar la solicitud de eliminar curso. ' + data.response)
            }
            console.log('Examen eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el examen:', error);
        }
    }

    const createExam = async (exam) => {
        try {
            const response = await fetch('http://localhost:8084/examenes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exam),
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log('Examen guardado exitosamente:', responseData)
            } else {
                console.error('Error al guardar el examen:', response.status)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    const publishExam = async (id) => {
        try {
            const response = await fetch(`http://localhost:8084/examenes/publish/${id}`, {
                method: 'PUT'
            })
            const responseData = await response.json()
            if (response.ok) {
                console.log('Examen publicado exitosamente:', responseData)
            } else {
                console.error('Error al publicar el examen:', responseData)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    const updateExam = async (id, exam) => {
        console.log("examen mandado a actualizar:")
        console.log(exam)
        try {
            const response = await fetch(`http://localhost:8084/examenes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exam),
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log('Examen actualizado exitosamente:', responseData)
            } else {
                console.error('Error al actualizar el examen:', response.status)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    const handleExamClick = (exam) => {
        setSelectedExam(exam);
    }

    const handleExamToDeleteClick = (exam) => {
        setSelectedExamToDelete(exam);
    }

    const handleExamToPublishClick = (exam) => {
        setSelectedExamToPublish(exam);
    }

    return { exams, handleExamClick, deleteExam, getExamsByStudent, handleExamToPublishClick, selectedExamToPublish, handleExamToDeleteClick, selectedExamToDelete, publishExam, updateExam, createExam, getExamsByCourse, selectedExam }
}