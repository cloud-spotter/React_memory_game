import React from 'react';
import Modal from 'react-modal';

function GameOverModal({ isOpen, closeModal, moveCount, startGame }) {
    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel='Game Over'>
        <h2>GameOver!</h2>
        <div>You found all the pairs in {moveCount} moves</div>
        <button onClick={startGame}>Play Again</button>
      </Modal>
    );
}

export default GameOverModal;