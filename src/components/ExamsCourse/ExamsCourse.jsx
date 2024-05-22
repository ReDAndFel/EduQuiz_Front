import { useNavigate } from "react-router-dom"
import { useCourse } from "../../hooks/useCourse"
import { useExam } from "../../hooks/useExam"
import { useInstitution } from "../../hooks/useInstitution"
import PlusIcon from "../../../public/icons/plus_icon/PlusIcon"
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

    const handleClickAddExam = (exam) => {
        navigate("/gestionar-examen", { state: { selectedCourse } })
    }

    useEffect(() => {
        console.log(selectedExam)
    }, [selectedExam])


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
                    <div className="list-exams-sections">
                        <div className="list-exams-section">
                            <h3>Borradores</h3>
                            <div className="exams-course">
                                {exams.filter(exam => exam.estado === "Borrador").map((exam, index) => (
                                    <div onClick={() => handleClickExam(exam)} key={index} className="exam-card">
                                        <label>{exam.titulo}</label>
                                    </div>
                                ))}
                                <button className="add-exam-button" onClick={()=> handleClickAddExam()}>
                                    <PlusIcon />
                                </button>

                            </div>
                        </div>
                        <div className="list-exams-section">
                            <h3>Publicados</h3>
                            <div className="exams-course">
                                {exams.filter(exam => exam.estado === "Publicado").map((exam, index) => (
                                    <div onClick={() => handleClickExam(exam)} key={index} className="exam-card">
                                        <label>{exam.titulo}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>No examenes disponibles.</p>
                )}
            </div>




        </div>
    )
}

export default ExamsCourse