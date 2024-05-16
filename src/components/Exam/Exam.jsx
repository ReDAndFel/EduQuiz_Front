import { useLocation } from "react-router-dom";
import "./Exam.css"
import { useQuestion } from "../../hooks/useQuestion";
import { useEffect, useState } from "react";
import { useAnswer } from "../../hooks/useAnswer";
import QuestionCard from "../QuestionCard/QuestionCard";

const Exam = () => {
    const { state } = useLocation();
    const { selectedStudent, selectedExam } = state || {}
    const { questions, handleQuestionClick, getQuestionByExamIdAndIdStudent, selectedQuestion } = useQuestion()
    const { answers, handleAnswerClick, getAnswerByIdQuestion, selectedAnswer } = useAnswer()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const questionsLength = questions.length
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [data, setData] = useState([])


    useEffect(() => {
        getQuestionByExamIdAndIdStudent(selectedExam.id, selectedStudent.id)
    }, [])

    useEffect(() => {
        console.log("data:")

        console.log(data)
    }, [data])

    const handleNextQuestion = () => {
        const newResponses = Object.values(selectedAnswers).filter(response => {
            return !data.some(existingResponse => existingResponse.idRespuesta === response.idRespuesta);
        });
    
        const updatedData = [...data, ...newResponses];
        setData(updatedData);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    const handleClickSaveAnswers = () => {
        const newResponses = Object.values(selectedAnswers).filter(response => {
            return !data.some(existingResponse => existingResponse.idRespuesta === response.idRespuesta);
        });
    
        const updatedData = [...data, ...newResponses];
        setData(updatedData);
        console.log("Examen finalizado")
    }

    useEffect(() => {
        if (questionsLength > 0) {
            console.log("Pregunta anterior:")
            console.log(currentQuestion)
            setCurrentQuestion(questions[currentQuestionIndex]);
            getAnswerByIdQuestion(questions[currentQuestionIndex][0].id);
        }
    }, [currentQuestionIndex, questions]);

    return (
        <div className="exam-container">
            <h2>Titulo: {selectedExam.titulo}</h2>
            <h3>Estudiante: {selectedStudent.nombre}</h3>
            <h3>Curso: {selectedStudent.idcurso.nombrecurso}</h3>
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