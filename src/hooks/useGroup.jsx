import { useEffect, useState } from "react";

export const useGroup = () => {
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('')

    useEffect(() => {
        // Aquí harías la petición a la base de datos para obtener los cursos
        const getGroups = async () => {
            // const respuesta = await fetch('/universidades')
            //const datos = await respuesta.json()
            const data = [
                {
                    id: 1,
                    descripcion: "01-A"
                },
                {
                    id: 2,
                    descripcion: "02-A"
                }
            ]
            setGroups(data);
        };
        getGroups()
    }, [])

    const handleChangeGroup = (e) => {
        setSelectedGroup(e.target.value);
    }

    return { groups, handleChangeGroup, selectedGroup }
}