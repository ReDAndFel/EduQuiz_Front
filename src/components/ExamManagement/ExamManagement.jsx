import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";
import { useUniversity } from "../../hooks/useUniversity";
import { useGroup } from "../../hooks/useGroup";
import { useTopic } from "../../hooks/useTopic";

const ExamManagement = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useUniversity()
    const { courses, handleChangeCourse, selectedCourse } = useCourse()
    const { groups, handleChangeGroup, selectedGroup } = useGroup()
    const { topics, handleChangeTopic, selectedTopic } = useTopic()

    return (
        <div className="exam-management-container">
            <h1>Gestionar examanes</h1>
            <form className="form" action="">
                <label>Universidad</label>
                <SelectComponent
                    list={universities}
                    onChange={handleChangeUniversity}
                    defaultValue={selectedUniversity}
                    firstOption="Seleccione una universidad"
                />
                <label>Curso</label>
                <SelectComponent
                    list={courses}
                    onChange={handleChangeCourse}
                    defaultValue={selectedCourse}
                    firstOption="Seleccione un curso"
                />
                <label>Grupo</label>
                <SelectComponent
                    list={groups}
                    onChange={handleChangeGroup}
                    defaultValue={selectedGroup}
                    firstOption="Seleccione un grupo"
                />
                <label>Tema</label>
                <SelectComponent
                    list={topics}
                    onChange={handleChangeTopic}
                    defaultValue={selectedTopic}
                    firstOption="Seleccione un tema"
                />
            </form>
        </div>
    )
}

export default ExamManagement