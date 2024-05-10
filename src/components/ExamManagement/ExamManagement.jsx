import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";
import { useTopic } from "../../hooks/useTopic";
import { useLocation, useNavigate } from "react-router-dom";
import { useInstitution } from "../../hooks/useInstitution";
import { useEffect } from "react";

const ExamManagement = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useInstitution()
    const { courses,getCourses, handleChangeCourse, selectedCourse } = useCourse()
    const { topics, handleChangeTopic,getTopics, selectedTopic } = useTopic()
    const navigate = useNavigate()
    const { state } = useLocation();

    const handleClickNext = (e) => {
        navigate('/preguntas', { state: { selectedUniversity, selectedCourse, selectedTopic } })
    }

    useEffect(()=>{
        getCourses(selectedUniversity)
    },[selectedUniversity])

    useEffect(()=>{
        getTopics()
    },[selectedCourse])


    return (
        <div className="exam-management-container">
            <h1>Crear examen</h1>
            <form className="form" action="">
                <input type="text" name="title" placeholder="Titulo del examen" />
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