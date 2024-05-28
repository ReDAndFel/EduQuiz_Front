import { useLocation, useNavigate } from "react-router-dom"
import { useStudent } from "../../hooks/useStudent"
import { useAsignStudent } from "../../hooks/useAsignStudent"
import "./PreExam.css"
import SelectComponent from "../SelectComponent/SelectComponent"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"
import { useEffect, useState } from "react"

const PreExam = () => {
    const { state } = useLocation()
    const { selectedExam, selectedCourse } = state
    const { getStudentsByIdCourse, handleChangeStudent, selectedStudent, listStudents } = useStudent()
    const { getAsignStudentByIdStudentAndIdExam, asignStudent } = useAsignStudent()
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    useEffect(() => {
        if (selectedExam) {
            getStudentsByIdCourse(selectedExam.idCurso)
        }
    }, [selectedExam])

    useEffect(() => {
        if (selectedStudent && selectedExam) {
            getAsignStudentByIdStudentAndIdExam(selectedStudent.id, selectedExam.id)
        }
    }, [selectedStudent])

    useEffect(() => {
        if (asignStudent) {
            console.log(asignStudent)
        }
    }, [asignStudent])

    const handleClickStart = () => {
        openModal()
    }

    const handleStartExam = () => {
        console.log("Asignacion creada")
        navigate("/exam", { state: { selectedExam, selectedStudent }})
    }

    return (
        <div className="preexam-container">

            <div className="combobox">
                <label>Estudiante</label>
                <SelectComponent
                    list={listStudents}
                    onChange={handleChangeStudent}
                    defaultValue={selectedStudent}
                    firstOption="Seleccione el estudiante que presentará el examen"
                    disabled={false}
                    elementValue={"nombre"}
                />

                {!asignStudent && selectedStudent &&
                    <>
                        <h1>¡Atención!</h1>
                        <p>Si se da al botón de comenzar comenzará el examen, no podrá salirse hasta terminarlo. Si se sale su nota quedará como la llevase hasta el momento.</p>
                    </>
                }

                {asignStudent &&
                    <>
                        <h1>Usted ya ha presentado este  examen</h1>
                        <p>Su nota es {asignStudent.nota}</p>
                    </>
                }
                {selectedStudent && !asignStudent && <button onClick={handleClickStart}>Comenzar</button>}
            </div>

            <ConfirmationModal
                questionConfirm={"¿Seguro que desea comenzar el examen?"}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleStartExam}
            />

        </div>
    )
}

export default PreExam