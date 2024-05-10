import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";
import { useTopic } from "../../hooks/useTopic";
import { useLocation, useNavigate } from "react-router-dom";
import { useInstitution } from "../../hooks/useInstitution";
import { useEffect, useState } from "react";

const ExamManagement = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useInstitution()
    const { courses, getCourses, handleChangeCourse, selectedCourse } = useCourse()
    const { topics, handleChangeTopic, getTopics, selectedTopic } = useTopic()

    const [formData, setFormData] = useState({
        titulo: "",
        fecha: "",
        duracionExamen: "",
        cantidadPreguntas: "",
        cantidadPreguntasXEstudiante: "",
        calificacion: "",
        horaInicio: "",
        horaFin: "",
        idCurso: 0,
        idTema: 0,
        preguntas:[]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate()
    const { state } = useLocation();

    const handleClickNext = (e) => {
        e.preventDefault()
        const updateForm = {
            ...formData,
            curso: selectedCourse,
            tema: selectedTopic,
            idCurso: selectedCourse.id,
            idTema: selectedTopic.id

        };
        console.log(updateForm)
        navigate('/preguntas', { state: { updateForm } });
    }

    useEffect(() => {
        getCourses(selectedUniversity)
    }, [selectedUniversity])

    useEffect(() => {
        getTopics()
    }, [selectedCourse])


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
                    name="duracionExamen"
                    placeholder="Duracion del examen en minutos"
                    value={formData.duracionExamen}
                    onChange={handleInputChange}
                />
                <label>Cantidad total de preguntas</label>
                <input
                    type="number"
                    name="cantidadPreguntas"
                    placeholder="Cantidad de preguntas totales"
                    value={formData.cantidadPreguntas}
                    onChange={handleInputChange}
                />
                <label>Cantidad de preguntas por estudiante</label>
                <input
                    type="number"
                    name="cantidadPreguntasXEstudiante"
                    placeholder="Cantidad de preguntas por estudiante"
                    value={formData.cantidadPreguntasXEstudiante}
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
                    <label>Universidad</label>
                    <SelectComponent
                        list={universities}
                        onChange={handleChangeUniversity}
                        defaultValue={selectedUniversity}
                        firstOption="Seleccione una universidad"
                        disable={false}
                        elementValue={"nombreninstitucion"}
                    />
                </div>
                <div className="combobox">
                    <label>Curso</label>
                    <SelectComponent
                        list={courses}
                        onChange={handleChangeCourse}
                        defaultValue={selectedCourse}
                        firstOption="Seleccione un curso"
                        disabled={selectedUniversity != "" ? false : true}
                        elementValue={"nombrecurso"}
                    />
                </div>

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