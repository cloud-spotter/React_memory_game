import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../Home';
// import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';
import Footer from '../footer/Footer';
import HeaderGame from '../header/HeaderGame';
import HeaderHome from '../header/HeaderHome';

function App() {
  const location  = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className="memory-game">
      <div className="logo-container">
        {isHome ? <HeaderHome /> : <HeaderGame />}  {/* Conditionally render headers */}
        {isHome && (
          <div className="home-cards">
            <button className="home-card-facedown">Match all the pairs!<br></br><br></br>How many moves will it take you?</button>
            <button className="home-card-faceup"><img src="/images/animal_card_set/fox.png" alt="card" style={{ width: '90%', height: '70%' }} /></button>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<div className="game-container"><GameBoard /></div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
