import { Route, Routes } from 'react-router-dom'
import './App.css'
import AsideMenu from '../AsideMenu/AsideMenu'
import ExamManagement from '../ExamManagement/ExamManagement'
import QuestionManagement from '../QuestionManagement/QuestionManagement'
import Exams from '../Exams/Exams'
import QuestionUniqueAnswordForm from '../QuestionUniqueAnswordForm/QuestionUniqueAnswordForm'

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
        <Route path="/agregar-pregunta" element={<QuestionUniqueAnswordForm />} />

      </Routes>

    </div>
  )
}

export default App
