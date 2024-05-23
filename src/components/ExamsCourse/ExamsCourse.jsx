import { useNavigate } from "react-router-dom"
import { useCourse } from "../../hooks/useCourse"
import { useExam } from "../../hooks/useExam"
import { useInstitution } from "../../hooks/useInstitution"
import PlusIcon from "../../../public/icons/plus_icon/PlusIcon"
import "./ExamsCourse.css"
import { useEffect, useState } from "react"
import SelectComponent from "../SelectComponent/SelectComponent"
import ExamCard from "../ExamCard/ExamCard"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"

const ExamsCourse = () => {
    const { universities, handleChangeUniversity, selectedUniversity } = useInstitution()
    const { courses, getCourses, handleChangeCourse, selectedCourse } = useCourse()
    const { exams, handleExamClick, getExamsByCourse, deleteExam, selectedExam, handleExamToDeleteClick, selectedExamToDelete } = useExam()
    const examsLength = exams.length
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    useEffect(() => {
        if (selectedUniversity) getCourses(selectedUniversity.id)
    }, [selectedUniversity])

    useEffect(() => {
        if (selectedCourse) getExamsByCourse(selectedCourse.id)
    }, [selectedCourse])

    const handleClickExam = (exam) => {
        handleExamClick(exam)
    }

    const handleClickDelete = async (exam) => {
        await handleExamToDeleteClick(exam)
        openModal()
    }

    const handleDeleteExam = async () => {
        if (selectedExamToDelete) {
            await deleteExam(selectedExamToDelete.id)
            getExamsByCourse(selectedCourse.id)
        }
    }

    const handleClickAddExam = (exam) => {
        navigate("/gestionar-examen", { state: { selectedCourse } })
    }

    useEffect(() => {
        if (selectedExam) {
            console.log(selectedExam)
            navigate("/gestionar-examen", { state: { selectedCourse, selectedExam } })
        }
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
                                    <ExamCard onClick={() => handleClickExam(exam)} key={index} exam={exam} onDelete={handleClickDelete} />
                                ))}
                                <button className="add-exam-button" onClick={() => handleClickAddExam()}>
                                    <PlusIcon />
                                </button>

                            </div>
                        </div>
                        <div className="list-exams-section">
                            <h3>Publicados</h3>
                            <div className="exams-course">
                                {exams.filter(exam => exam.estado === "Publicado").map((exam, index) => (
                                    <ExamCard onClick={() => handleClickExam(exam)} key={index} exam={exam} />
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>No examenes disponibles.</p>
                )}
            </div>
            <ConfirmationModal
                questionConfirm={"¿Seguro que desea eliminar el borrador?"}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDeleteExam}
            />
        </div>
    )
}

export default ExamsCourse