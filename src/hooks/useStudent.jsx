import { useState } from "react";

export const useStudent = () => {

    const [listStudents, setListStudents] = useState([])

    const API = ""

    const getAllStudents = async () => {
        fetch(`${API}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setListStudents(data.response)
            })
            .catch(error => {
                console.error('Error en la solicitud http:', error);
            });
    }

    return { getAllStudents, listStudents }
}