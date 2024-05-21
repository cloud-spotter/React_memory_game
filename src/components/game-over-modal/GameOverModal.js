import React from 'react';
import Modal from 'react-modal';

function GameOverModal({ isOpen, closeModal, moveCount, startGame }) {
    return (
      <>
        {isOpen && (
          <div className='modal-overlay'>
            <Modal className={"game-over-modal"} overlayClassName={'modal-overlay'} isOpen={isOpen} onRequestClose={closeModal} contentLabel='Game Over'>
              <h2>Game Over!</h2>
              <div>You found all the pairs in {moveCount} moves</div>
              <br></br>
              <button className='button play-again' aria-label='Play Again' onClick={startGame}>Play Again</button>
            </Modal>
          </div>
        )}
      </>
    );
}

export default GameOverModal;