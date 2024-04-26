import { Route, Routes } from 'react-router-dom'
import './App.css'
import AsideMenu from '../AsideMenu/AsideMenu'
import ExamManagement from '../ExamManagement/ExamManagement'
import QuestionManagement from '../QuestionManagement/QuestionManagement'
import ExamAssignment from '../ExamAssignment/ExamAssignment'
import Exams from '../Exams/Exams'

function App() {
  return (
    <div className='app'>
      <aside>
        <AsideMenu />
      </aside>

      <Routes>
        <Route path="/gestionar-examen" element={<ExamManagement />} />
        <Route path="/" element={<ExamManagement />} />
        <Route path="/gestionar-preguntas" element={<QuestionManagement />} />
        <Route path="/asignacion-examanes" element={<ExamAssignment />} />
        <Route path="/examenes" element={<Exams />} />
      </Routes>

    </div>
  )
}

export default App
