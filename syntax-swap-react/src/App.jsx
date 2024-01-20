import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/home'
import Header from './components/Header/header'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from './components/Footer/footer'
import History from './pages/History/history'
import Translator from './pages/Translator/translator'
import Extractor from './pages/CodeExtractor/extractor'
import About from './pages/About/about'
import CodeTranslatorTab from './components/TranslatorTab/translatortab'
import FileTranslator from './pages/FileTranslator/file_transator';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

    <Router>
      <Header/>
      <Routes>
        <Route path="/" Component={Translator}/>
        {/* <Route path="/home" Component={Home} /> */}
        <Route path="/translator" Component={Translator} />
        {/* <Route path="/history" Component={History} />
        <Route path="/extractor" Component={Extractor} /> */}
        <Route path="/file_translator" Component={FileTranslator} />
        <Route path="/about" Component={About} />
      </Routes>
      {/* <Footer/> */}
    </Router>
    </div>
  )
}

export default App
