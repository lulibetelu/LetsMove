import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HolaPage from "./pages/HolaPage.tsx";
import ChauPage from "./pages/ChauPage.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HolaPage />}/>
            <Route path="/chau" element={<ChauPage />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
