import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './homepage.jsx';
import NavBar from './navbar.jsx';
import MyRecipes from './sections/myRecipes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/homepage" element={<HomePage/>} />
      <Route path="/navbar" element={<NavBar/>} />
      <Route path="/myRecipes" element={<MyRecipes/>} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
