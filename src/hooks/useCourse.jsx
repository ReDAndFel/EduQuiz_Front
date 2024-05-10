import { useEffect, useState } from "react"

export const useCourse = () => {
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')


    // Aquí harías la petición a la base de datos para obtener los cursos
    const getCourses = async (idInstitution) => {
        try {
            const respuesta = await fetch(`http://localhost:8084/cursos/institution/${idInstitution}`);
            if (!respuesta.ok) {
                throw new Error('No se pudo completar la solicitud');
            }
            const data = await respuesta.json();
            if (Array.isArray(data.response)) {
                setCourses(data.response);
            } else {
                console.error('La respuesta no contiene un array de cursos:', data);
            }
        } catch (error) {
            console.error('Error al obtener los cursos:', error);
        }
    };


    const handleChangeCourse = (e) => {
        setSelectedCourse(e.target.value)
    }

    return { courses, handleChangeCourse,getCourses, selectedCourse }
}