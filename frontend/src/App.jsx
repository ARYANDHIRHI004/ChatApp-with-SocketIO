import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<HomePage/>} />
      </Route>
    
    </Routes>
  )
}

export default App
