import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";
import { useUniversity } from "../../hooks/useUniversity";
import { useGroup } from "../../hooks/useGroup";
import { useTopic } from "../../hooks/useTopic";
import { useLocation, useNavigate } from "react-router-dom";

const ExamManagement = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useUniversity()
    const { courses, handleChangeCourse, selectedCourse } = useCourse()
    const { groups, handleChangeGroup, selectedGroup } = useGroup()
    const { topics, handleChangeTopic, selectedTopic } = useTopic()
    const navigate = useNavigate()
    const { state } = useLocation();

    const handleClickNext = (e) => {
        navigate('/preguntas', { state: { selectedUniversity, selectedCourse, selectedGroup, selectedTopic } })
    }


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
                    />
                </div>
                <div className="combobox">
                    <label>Grupo</label>
                    <SelectComponent
                        list={groups}
                        onChange={handleChangeGroup}
                        defaultValue={selectedGroup}
                        firstOption="Seleccione un grupo"
                        disabled={selectedCourse != "" ? false : true}

                    />
                </div>
                <div className="combobox">
                    <label>Tema</label>
                    <SelectComponent
                        list={topics}
                        onChange={handleChangeTopic}
                        defaultValue={selectedTopic}
                        firstOption="Seleccione un tema"
                        disabled={selectedGroup != "" ? false : true}

                    />
                </div>
                <button disabled={selectedTopic != "" ? false : true} onClick={() => handleClickNext()}>Siguiente</button>
            </form>
        </div>
    )
}

export default ExamManagement