import './App.css';
import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';

function App() {
  return (
    <>
      <div className="header"><Header /></div>
      <div><GameBoard /></div> 
      {/* TODO: update after TDD! */}
      {/* <div><Card /></div>  */}
    </>
  );
}

export default App;
