import { useEffect, useState } from "react";

export const useUniversity = () => {
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getUniversities = async () => {
            // const respuesta = await fetch('/universidades');
            //const datos = await respuesta.json();
            const data = [
                {
                    id: 1,
                    descripcion: "Universidad del Quindío"
                },
                {
                    id: 2,
                    descripcion: "Universidad Gran Colombia"
                }
            ]
            setUniversities(data);
        };
        getUniversities();
    }, []);

    const handleChangeUniversity = (e) => {
        setSelectedUniversity(e.target.value);
    };

    return { universities, handleChangeUniversity, selectedUniversity }
}