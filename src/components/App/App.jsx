import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'
import AsideMenu from '../AsideMenu/AsideMenu'

function App() {
  return (
    <div className='app'>
      <aside>
        <AsideMenu />
      </aside>

      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  )
}

export default App
