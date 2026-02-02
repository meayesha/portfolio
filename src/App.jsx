import { HashRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

import Home from './pages/Home'
import Education from './pages/Education'
import Work from './pages/Work'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

import RobotGuide from './components/RobotGuide/RobotGuide'

import './App.css'

function App() {
  return (
    <HashRouter>
      <Navigation />

      {/* 🤖 Global robot guide (persistent across routes) */}
      <RobotGuide />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </HashRouter>
  )
}

export default App
