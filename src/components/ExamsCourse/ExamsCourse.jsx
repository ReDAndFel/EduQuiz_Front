import { useNavigate } from "react-router-dom"
import { useCourse } from "../../hooks/useCourse"
import { useExam } from "../../hooks/useExam"
import { useInstitution } from "../../hooks/useInstitution"
import "./ExamsCourse.css"
import { useEffect } from "react"
import SelectComponent from "../SelectComponent/SelectComponent"

const ExamsCourse = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useInstitution()
    const { courses, getCourses, handleChangeCourse, selectedCourse } = useCourse()
    const { exams, handleExamClick, getExamsByCourse, selectedExam } = useExam()
    const examsLength = exams.length
    const navigate = useNavigate()

    useEffect(() => {
        getCourses(selectedUniversity.id)
    }, [selectedUniversity])

    useEffect(() => {
        getExamsByCourse(selectedCourse.id)
    }, [selectedCourse])

    const handleClickExam = (exam) => {
        handleExamClick(exam)
    }

    useEffect(() => {
        if (selectedExam) console.log(selectedExam)
    }, selectedExam)


    return (
        <div className="exams-course-container">
            <h1>Examenes</h1>
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
            <div className="list-exams-course-container">

                {examsLength > 0 ? (
                    <>
                        {exams.map((exam, index) => (
                            <div onClick={() => handleClickExam(exam)} key={index} className="exam-card">
                                <label>{exam.titulo}</label>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No examenes disponibles.</p>
                )}
            </div>




        </div>
    )
}

export default ExamsCourse