import { useLocation } from "react-router-dom"
import "./Exam.css"
import { useQuestion } from "../../hooks/useQuestion"
import { useAsignQuestion } from "../../hooks/useAsignQuestion"
import { useAsignStudent } from "../../hooks/useAsignStudent"
import { useEffect, useState } from "react"
import { useAnswer } from "../../hooks/useAnswer"
import QuestionCard from "../QuestionCard/QuestionCard"

const Exam = () => {
    const { state } = useLocation()
    const { selectedExam, selectedStudent } = state
    const { question, getQuestionByid } = useQuestion()
    const {getAsignQuestionByIdAsignStudent, listAsignQuestion} = useAsignQuestion()
    const {getAsignStudentByIdStudentAndIdExam, asignStudent} = useAsignStudent()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const listAsignQuestionLength = listAsignQuestion.length
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [data, setData] = useState([])


    useEffect(() => {
        getAsignStudentByIdStudentAndIdExam(selectedStudent.id, selectedExam.id)
    }, [])

    useEffect(() => {
        if (asignStudent) {
            getAsignQuestionByIdAsignStudent(asignStudent.id)
        }
    }, [asignStudent])

    useEffect(() => {
        console.log("data:")

        console.log(data)
    }, [data])

    const handleNextQuestion = () => {
        const newResponses = Object.values(selectedAnswers).filter(response => {
            return !data.some(existingResponse => existingResponse.idRespuesta === response.idRespuesta)
        })

        const updatedData = [...data, ...newResponses]
        setData(updatedData)
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }

    const handleClickSaveAnswers = () => {
        const newResponses = Object.values(selectedAnswers).filter(response => {
            return !data.some(existingResponse => existingResponse.idRespuesta === response.idRespuesta)
        })

        const updatedData = [...data, ...newResponses]
        setData(updatedData)
        console.log("Examen finalizado")
    }

    useEffect(() => {
        if (listAsignQuestionLength > 0) {
            console.log("Pregunta anterior:")
            console.log(currentQuestion)
            setCurrentQuestion(listAsignQuestionLength[currentQuestionIndex])
            getAnswerByIdQuestion(listAsignQuestionLength[currentQuestionIndex][0].id)
        }
    }, [currentQuestionIndex, listAsignQuestionLength])

    return (
        <div className="exam-container">
            <h2>Titulo: {selectedExam.titulo}</h2>
            <h3>Estudiante: {selectedStudent.nombre}</h3>
            {currentQuestion && (
                <div className="question-container">
                    <label>Pregunta {currentQuestionIndex + 1} de {questionsLength}</label>
                    <QuestionCard currentQuestion={currentQuestion} answers={answers} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} />
                    {currentQuestionIndex < questions.length - 1 && (
                        <div className="question-action-container">
                            <p>Si da a <strong>siguiente</strong> no podrá devolverse a la pregunta. Asegurese de haber contestado la pregunta antes de continuar</p>
                            <button onClick={handleNextQuestion}>Siguiente</button>
                        </div>

                    )}
                </div>
            )}

            {currentQuestionIndex == (questionsLength - 1) && <button onClick={handleClickSaveAnswers}>Guardar respuestas</button>}


        </div>
    )
}

export default Exam