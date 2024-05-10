import { useEffect, useState } from "react";

export const useInstitution = () => {
    const [universities, setUniversities] = useState([])
    const [selectedUniversity, setSelectedUniversity] = useState('')

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getUniversities = async () => {
            try {
                const respuesta = await fetch('http://localhost:8084/instituciones/');
                if (!respuesta.ok) {
                  throw new Error('No se pudo completar la solicitud');
                }
                const data = await respuesta.json();
                if (Array.isArray(data.response)) {
                  setUniversities(data.response);
                } else {
                  console.error('La respuesta no contiene un array de instituciones:', data);
                }
              } catch (error) {
                console.error('Error al obtener las universidades:', error);
              }
        };
        getUniversities()
    }, []);

    const handleChangeUniversity = (e) => {
        setSelectedUniversity(e.target.value)
    }

    return { universities, handleChangeUniversity, selectedUniversity }
}