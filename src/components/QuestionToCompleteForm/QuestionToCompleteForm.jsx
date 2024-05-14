import { useState } from "react";
import "./QuestionToCompleteForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import SelectComponent from "../SelectComponent/SelectComponent";
import { useStateQuestion } from "../../hooks/useStateQuestion";

const QuestionToCompleteForm = () => {
    const [statement, setStatement] = useState("");
    const [answers, setAnswers] = useState([{ opcionrespuesta: "", correcta: "Correcta" }]);
    const navigate = useNavigate();
    const { states, handleChangeState, selectedState } = useStateQuestion()
    const { state } = useLocation();
    const { data, selectedQuestionType } = state || {};

    const handleAnswerChange = (index,field, value) => {
        const newAnswers = [...answers];
        newAnswers[index][field] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = { "enunciado": statement, "respuestas": answers, "idTema": data.idTema, "idEstado": selectedState.id, idTipoPregunta: selectedQuestionType.id };
        const updateForm = {
            ...data,
            preguntas: [...(data.preguntas || []), newQuestion],
        };
        navigate("/preguntas", { state: { updateForm } });
    };

    return (
        <form className="form-question-unique-answord" onSubmit={handleSubmit}>
            <h1>Crear pregunta de completar </h1>
            <input
                type="text"
                placeholder="Enunciado"
                value={statement}
                onChange={(e) => setStatement(e.target.value)} />

            {answers.map((answer, index) => (
                <div className="answer-container" key={index}>
                    <label>Respuesta</label>
                    <textarea
                        type="text"
                        placeholder={"Ingrese la respuesta"}
                        value={answer.opcionrespuesta}
                        onChange={(e) => handleAnswerChange(index, "opcionrespuesta", e.target.value)}
                    />
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

            <button type="submit">Guardar pregunta</button>
        </form>
    );
};

export default QuestionToCompleteForm;