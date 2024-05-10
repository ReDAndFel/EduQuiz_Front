import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";
import { useTopic } from "../../hooks/useTopic";
import { useLocation, useNavigate } from "react-router-dom";
import { useInstitution } from "../../hooks/useInstitution";
import { useEffect } from "react";

const ExamManagement = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useInstitution()
    const { courses, getCourses, handleChangeCourse, selectedCourse } = useCourse()
    const { topics, handleChangeTopic, getTopics, selectedTopic } = useTopic()
    const navigate = useNavigate()
    const { state } = useLocation();

    const handleClickNext = (e) => {
        navigate('/preguntas', { state: { selectedUniversity, selectedCourse, selectedTopic } })
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
            <form className="form" action="">
                <label>Titulo</label>
                <input type="text" name="titulo" placeholder="Titulo del examen" />
                <label>Fecha</label>
                <input type="date" name="fecha" />
                <label>Duracion</label>
                <input type="number" name="duracionExamen" placeholder="Duracion del examen en minutos" />
                <label>Cantidad total de preguntas</label>
                <input type="number" name="cantidadPreguntas" placeholder="Cantidad de preguntas totales" />
                <label>Cantidad de preguntas por estudiante</label>
                <input type="number" name="cantidadPreguntasXEstudiante" placeholder="Cantidad de preguntas por estudiante" />
                <label>Calificación maxima</label>
                <input type="number" name="calificacion" placeholder="Calificacion máxima" />
                <label>Hora inicio</label>
                <input type="time" name="horaInicio" />
                <label>Hora fin</label>
                <input type="time" name="horaFin" />



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
                <button disabled={selectedTopic != "" ? false : true} onClick={() => handleClickNext()}>Siguiente</button>
            </form>
        </div>
    )
}

export default ExamManagement