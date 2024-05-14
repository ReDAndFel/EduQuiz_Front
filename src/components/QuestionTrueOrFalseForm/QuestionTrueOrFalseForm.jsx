import { useState } from "react";
import "./QuestionTrueOrFalseForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import SelectComponent from "../SelectComponent/SelectComponent";
import { useStateQuestion } from "../../hooks/useStateQuestion";

const QuestionTrueOrFalseForm = () => {
    const [statement, setStatement] = useState("");
    const [answers, setAnswers] = useState([{ opcionrespuesta: "Verdadero", correcta: "Correcta" }, { opcionrespuesta: "Falso", correcta: "Incorrecta" }]);
    const navigate = useNavigate();
    const { states, handleChangeState, selectedState } = useStateQuestion()
    const { state } = useLocation();
    const { data, selectedQuestionType } = state || {};

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answers];
        newAnswers[index][field] = value;
        // Si se marca una respuesta como correcta, las demás se marcan como incorrectas
        if (field === "correcta" && value === "Correcta") {
            newAnswers.forEach((answer, i) => {
                if (i !== index) {
                    answer.correcta = "Incorrecta";
                }
            });
        }
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
            <h1>Crear pregunta de falso o verdadero</h1>
            <input
                type="text"
                placeholder="Enunciado"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
            />
            {answers.map((answer, index) => (
                <div className="answer-container" key={index}>
                    <label>Respuesta</label>
                    <label><strong>{answer.opcionrespuesta}</strong></label>
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

export default QuestionTrueOrFalseForm;