import { useState } from "react"
import dotenv from 'dotenv'

dotenv.config()

export const useStudent = () => {

    const [listStudents, setListStudents] = useState([])

    const APIURL = process.env.API_URL_STUDENTS

    const getAllStudents = async () => {
        fetch(`${APIURL}/`)
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