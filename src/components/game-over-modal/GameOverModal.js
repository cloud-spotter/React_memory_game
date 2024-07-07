import React from 'react';
import Modal from 'react-modal';

function GameOverModal({ isOpen, closeModal, moveCount, resetGame, timer, onReturnHome }) {
    // Reset game (including stopping the timer) when the modal is closed
    const handleRequestClose = () => {
        resetGame(); 
        closeModal(); 
    };

    return (
      <>
        {isOpen && (
          <div className='modal-overlay'>
            <Modal className={"game-over-modal"} overlayClassName={'modal-overlay'} isOpen={isOpen} onRequestClose={handleRequestClose} contentLabel='Game Over'>
              <h2>Game Over!</h2>
              <div>You found all the pairs in {moveCount} moves.</div>
              <div>Time: {timer} seconds</div>
              <br></br>
              <div className="button-group-modal">
                <button className='button play-again' aria-label='Play Again' onClick={() => {resetGame(); closeModal(); }} >Play Again</button>
                <button className='button home' aria-label='Home' onClick={() => {resetGame(); closeModal(); onReturnHome()}} >Home</button>
              </div>
            </Modal>
          </div>
        )}
      </>
    );
}

export default GameOverModal;