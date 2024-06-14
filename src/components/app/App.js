import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';
import Footer from '../footer/Footer';

function App() {
  return (
    <div className="memory-game">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<div className="game-container"><GameBoard /></div>} />
      </Routes>
        <Footer />
    </div>
  );
}

export default App;
