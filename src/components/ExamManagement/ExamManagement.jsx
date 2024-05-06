import SelectComponent from "../SelectComponent/SelectComponent";
import "./ExamManagement.css"
import { useCourse } from "../../hooks/useCourse";

const ExamManagement = () => {
    const { courses, handleChangeCourse, selectedCourse } = useCourse()
    return (
        <div className="exam-management-container">
            <h1>Gestionar examanes</h1>

            <SelectComponent
                list={courses}
                onChange={handleChangeCourse}
                defaultValue={selectedCourse}
                firstOption="Seleccione un curso"
            />


        </div>
    )
}

export default ExamManagement