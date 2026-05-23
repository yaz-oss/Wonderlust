import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-bg text-primary-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
