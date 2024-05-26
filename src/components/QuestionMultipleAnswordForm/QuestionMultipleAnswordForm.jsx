import { useState } from "react"
import "./QuestionMultipleAnswordForm.css"
import { useLocation, useNavigate } from "react-router-dom"
import SelectComponent from "../SelectComponent/SelectComponent"
import { useStateQuestion } from "../../hooks/useStateQuestion"
import DeleteButton from "../DeleteButton/DeleteButton"

const QuestionMultipleAnswordForm = () => {
    const [statement, setStatement] = useState("")
    const [weight, setWeight] = useState(0.0)
    const [answers, setAnswers] = useState([{ opcionrespuesta: "", correcta: "Incorrecta" }])
    const navigate = useNavigate()
    const { states, handleChangeState, selectedState } = useStateQuestion()
    const { state } = useLocation()
    const { data, selectedQuestionType } = state || {}

    const handleAddAnswer = () => {
        setAnswers([...answers, { opcionrespuesta: "", correcta: "Incorrecta" }])
    }

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answers]
        newAnswers[index][field] = value
        setAnswers(newAnswers)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newQuestion = { "enunciado": statement, "respuestas": answers, "idTema": data.idTema, "idEstado": selectedState.id, "peso": weight, idTipoPregunta: selectedQuestionType.id }
        const updateForm = {
            ...data,
            preguntas: [...(data.preguntas || []), newQuestion],
        }
        navigate("/preguntas", { state: { updateForm } })
    }
    
    const handleClickDelete = (answerDeleted) =>{
        const updatedAnwers = answers.filter(answer => answer != answerDeleted)
        setAnswers(updatedAnwers)
    }

    return (
        <form className="form-question-unique-answord" onSubmit={handleSubmit}>
            <h1>Crear pregunta de multiple respuesta</h1>
            <label > Enunciado</label>
            <input
                type="text"
                placeholder="Enunciado"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
            />
            <label > Peso</label>
            <input
                type="number"
                step="0.01"
                placeholder="Peso"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            {answers.map((answer, index) => (
                <div className="answer-container" key={index}>
                    <div className="answer-content">
                    <label>Respuesta</label>
                    <input
                        type="text"
                        placeholder={"Ingrese la respuesta"}
                        value={answer.opcionrespuesta}
                        onChange={(e) => handleAnswerChange(index, "opcionrespuesta", e.target.value)}
                    />
                    <label>Valor</label>
                    <label>
                        <input
                            type="radio"
                            name={`correcta-${index}`}
                            value="Correcta"
                            checked={answer.correcta === "Correcta"}
                            onChange={(e) =>
                                handleAnswerChange(index, "correcta", e.target.value)
                            }
                        />
                        Correcta
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={`correcta-${index}`}
                            value="Incorrecta"
                            checked={answer.correcta === "Incorrecta"}
                            onChange={(e) =>
                                handleAnswerChange(index, "correcta", e.target.value)
                            }
                        />
                        Incorrecta
                    </label>
                    </div>
                    {answers.length > 1 && <DeleteButton handleClick={()=>handleClickDelete(answer)}/>}

                </div>
            ))}
            <label>Privacidad</label>
            <SelectComponent
                list={states}
                onChange={handleChangeState}
                defaultValue={selectedState}
                firstOption="Seleccione el estado"
                disabled={false}
                elementValue={"descripcion"}
            />
            <button type="button" onClick={handleAddAnswer}>
                Agregar respuesta
            </button>
            <button type="submit">Guardar pregunta</button>
        </form>
    )
}

export default QuestionMultipleAnswordForm
