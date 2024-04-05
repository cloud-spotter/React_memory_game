import './App.css';
import Header from '../header/Header';
import Card from '../card/Card';

function App() {
  return (
    <>
      <div className="header"><Header /></div>
      {/* TODO: update after TDD! */}
      <div><Card /></div> 
    </>
  );
}

export default App;
