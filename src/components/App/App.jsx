import { Route, Routes } from 'react-router-dom'
import './App.css'
import AsideMenu from '../AsideMenu/AsideMenu'
import ExamManagement from '../ExamManagement/ExamManagement'
import QuestionManagement from '../QuestionManagement/QuestionManagement'
import Exams from '../Exams/Exams'
import QuestionUniqueAnswordForm from '../QuestionMultipleAnswordForm/QuestionMultipleAnswordForm'
import QuestionType from '../QuestionType/QuestionType'
import QuestionMultipleAnswordForm from '../QuestionMultipleAnswordForm/QuestionMultipleAnswordForm'
import QuestionTrueOrFalseForm from '../QuestionTrueOrFalseForm/QuestionTrueOrFalseForm'
import QuestionSortAnswordForm from '../QuestionSortAnswordForm/QuestionSortAnswordForm'
import QuestionToCompleteForm from '../QuestionToCompleteForm/QuestionToCompleteForm'
import QuestionMatchAnswordForm from '../QuestionMatchAnswordForm/QuestionMatchAnswordForm'
import Exam from '../Exam/Exam'
import BankQuestions from '../BankQuestions/BankQuestions'
import ExamsCourse from '../ExamsCourse/ExamsCourse'

function App() {
  return (
    <div className='app'>
      <aside>
        <AsideMenu />
      </aside>

      <Routes>
        <Route path="/" element={<ExamsCourse />} />
        <Route path="/gestionar-examenes" element={<ExamsCourse />} />
        <Route path="/gestionar-examen" element={<ExamManagement />} />
        <Route path="/preguntas" element={<QuestionManagement />} />
        <Route path="/examenes" element={<Exams />} />
        <Route path="/agregar-pregunta-Selección múltiple única respuesta" element={<QuestionUniqueAnswordForm />} />
        <Route path="/agregar-pregunta-Selección múltiple múltiples respuestas" element={<QuestionMultipleAnswordForm />} />
        <Route path="/agregar-pregunta-Falso y verdadero" element={<QuestionTrueOrFalseForm />} />
        <Route path="/agregar-pregunta-Ordenar" element={<QuestionSortAnswordForm />} />
        <Route path="/agregar-pregunta-Completar" element={<QuestionToCompleteForm />} />
        <Route path="/agregar-pregunta-Emparejar" element={<QuestionMatchAnswordForm />} />
        <Route path="/tipo-pregunta" element={<QuestionType />} />
        <Route path="/banco-preguntas" element={<BankQuestions />} />
        <Route path="/examen" element={<Exam />} />

      </Routes>

    </div>
  )
}

export default App
