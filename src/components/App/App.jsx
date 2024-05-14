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

function App() {
  return (
    <div className='app'>
      <aside>
        <AsideMenu />
      </aside>

      <Routes>
        <Route path="/gestionar-examen" element={<ExamManagement />} />
        <Route path="/preguntas" element={<QuestionManagement />} />
        <Route path="/" element={<ExamManagement />} />
        <Route path="/examenes" element={<Exams />} />
        <Route path="/agregar-pregunta-Selección múltiple única respuesta" element={<QuestionUniqueAnswordForm />} />
        <Route path="/agregar-pregunta-Selección múltiple múltiples respuestas" element={<QuestionMultipleAnswordForm />} />
        <Route path="/agregar-pregunta-Falso y verdadero" element={<QuestionTrueOrFalseForm />} />
        <Route path="/agregar-pregunta-Ordenar" element={<QuestionSortAnswordForm />} />
        <Route path="/tipo-pregunta" element={<QuestionType />} />


      </Routes>

    </div>
  )
}

export default App
