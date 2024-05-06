import { useEffect, useState } from "react";

export const useCourse = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getCourses = async () => {
            // const respuesta = await fetch('/cursos');
            //const datos = await respuesta.json();
            const data = [
                {
                    id: 1,
                    descripcion: "Bases de datos"
                },
                {
                    id: 2,
                    descripcion: "Programacion en la nube"
                }
            ]
            setCourses(data);
        };
        getCourses();
    }, []);

    const handleChangeCourse = (e) => {
        setSelectedCourse(e.target.value);
    };

    return { courses, handleChangeCourse, selectedCourse }
}