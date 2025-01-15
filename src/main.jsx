import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './homepage.jsx';
import NavBar from './components/navbar.jsx';
import MyRecipes from './sections/myRecipes.jsx';
import Explore from './sections/explore.jsx';
import Favourites from './sections/favourites.jsx';
import Recipe from './sections/recipe.jsx';
import Profile from './sections/profile.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/homepage" element={<HomePage/>} />
      <Route path="/navbar" element={<NavBar/>} />
      <Route path="/myRecipes" element={<MyRecipes/>} />
      <Route path="/explore" element={<Explore/>} />
      <Route path="/favourites" element={<Favourites/>} />
      <Route path='/recipe/:id' element={<Recipe/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  </BrowserRouter>
)
