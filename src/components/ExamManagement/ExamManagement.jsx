import SelectComponent from "../SelectComponent/SelectComponent"
import "./ExamManagement.css"
import { useTopic } from "../../hooks/useTopic"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ExamManagement = () => {
    const { topics, handleChangeTopic, getTopics, getTopicById, selectedTopic } = useTopic()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { selectedCourse, selectedExam } = state

    const [formData, setFormData] = useState(selectedExam || {
        titulo: "",
        fecha: "",
        duracionexamen: 0,
        cantidadpreguntas: 0,
        cantidadpreguntasporexamen: 0,
        calificacion: 0,
        notaParaAprobar: 0,
        horaInicio: "",
        horaFin: "",
        idCurso: 0,
        idTema: 0,
        estado: "Borrador",
        preguntas: []
    })


    useEffect(() => {
        if (selectedExam) {
            getTopicById(selectedExam.idTema)
            console.log(formData)
        }
    }, [])

    useEffect(() => {
        getTopics()
    }, [selectedCourse])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleClickNext = (e) => {
        e.preventDefault()
        const updateForm = {
            ...formData,
            curso: selectedCourse,
            tema: selectedTopic,
            idCurso: selectedCourse.id,
            idTema: selectedTopic.id

        }
        console.log(updateForm)
        navigate('/preguntas', { state: { updateForm } })
    }


    return (
        <div className="exam-management-container">
            <h1>Crear examen</h1>
            <form onSubmit={handleClickNext}>
                <label>Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Titulo del examen"
                    value={formData.titulo}
                    onChange={handleInputChange}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                />
                <label>Duracion</label>
                <input
                    type="number"
                    name="duracionexamen"
                    placeholder="Duracion del examen en minutos"
                    value={formData.duracionexamen}
                    onChange={handleInputChange}
                />
                <label>Cantidad total de preguntas</label>
                <input
                    type="number"
                    name="cantidadpreguntas"
                    placeholder="Cantidad de preguntas totales"
                    value={formData.cantidadpreguntas}
                    onChange={handleInputChange}
                />
                <label>Cantidad de preguntas por estudiante</label>
                <input
                    type="number"
                    name="cantidadpreguntasporexamen"
                    placeholder="Cantidad de preguntas por estudiante"
                    value={formData.cantidadpreguntasporexamen}
                    onChange={handleInputChange}
                />
                <label>Calificación máxima</label>
                <input
                    type="number"
                    name="calificacion"
                    placeholder="Calificación máxima"
                    value={formData.calificacion}
                    onChange={handleInputChange}
                />

                <label>Calificación para aprobar</label>
                <input
                    type="number"
                    name="notaParaAprobar"
                    placeholder="Calificación mínima para aprobar"
                    value={formData.notaParaAprobar}
                    onChange={handleInputChange}
                />
                <label>Hora inicio</label>
                <input
                    type="time"
                    name="horaInicio"
                    value={formData.horaInicio}
                    onChange={handleInputChange}
                />
                <label>Hora fin</label>
                <input
                    type="time"
                    name="horaFin"
                    value={formData.horaFin}
                    onChange={handleInputChange}
                />

                <div className="combobox">
                    <label>Tema</label>
                    <SelectComponent
                        list={topics}
                        onChange={handleChangeTopic}
                        defaultValue={selectedTopic}
                        firstOption="Seleccione un tema"
                        disabled={selectedCourse != "" ? false : true}
                        elementValue={"nombre"}

                    />
                </div>
                <button type="submit" disabled={selectedTopic != "" ? false : true} >Siguiente</button>
            </form>
        </div>
    )
}

export default ExamManagement