// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';
import Modal from 'react-modal';
import { MemoryRouter } from 'react-router-dom';

// Avoids warning to set the app element for 'react-modal' (along with modal import above)
// (ensures the modal library works properly & screen readers handle modal properly when displayed)
Modal.setAppElement(document.createElement('div')); 

describe('GameBoard', () => {
    beforeEach(() => {
        cleanup();
    });

    // Helper function to render the GameBoard component within a MemoryRouter context
    // This is necessary because GameBoard uses React Router hooks (useLocation, useNavigate),
    // which require a Router context to function properly in tests.
    // The function allows specifying a custom route, defaulting to '/game?gridSize=4x4'
    const renderWithRouter = (ui, { route = '/game?gridSize=4x4' } = {}) => {
        return render(
          <MemoryRouter initialEntries={[route]}>
            {ui}
          </MemoryRouter>
        );
      };
    
    test('renders the grid component', () => {
        renderWithRouter(<GameBoard />);
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
    });

    test('renders reset button', () => {
        renderWithRouter(<GameBoard />);
        const resetButton = screen.getByRole('button', { name: /reset/i });
        expect(resetButton).toBeInTheDocument();
    });

    test('flips a facedown-card when clicked', () => {
        renderWithRouter(<GameBoard />);
        const card = screen.getAllByRole('button', { name: /Card \d+ facedown/i })[0];
        fireEvent.click(card);
        expect(card).toHaveClass('card-faceup');
    });

    test('shuffles the cards randomly each render', () => {
        renderWithRouter(<GameBoard />);
        const firstRenderCards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });

        firstRenderCards.forEach(card => {
            fireEvent.click(card);
        });
        // Map over each card, querying for an 'img' element, returning the image 'src' attribute, if the image exists
        // If the image does not exist (e.g. card is not flipped/doesn't contain an image), return null
        const firstRenderCardImages = firstRenderCards.map(card => {
            // eslint-disable-next-line testing-library/no-node-access
            const img = card.querySelector('img');
            return img ? img.src : null;
        });

        cleanup();

        renderWithRouter(<GameBoard />);
        const secondRenderCards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });

        secondRenderCards.forEach(card => {
            fireEvent.click(card);
        });

        const secondRenderCardImages = secondRenderCards.map(card => {
            // eslint-disable-next-line testing-library/no-node-access
            const img = card.querySelector('img');
            return img ? img.src : null;
        });

        expect(firstRenderCardImages).not.toEqual(secondRenderCardImages);
    });

    test('registers cards as matched when two matching cards are flipped', async () => {
        renderWithRouter(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });
        const firstCard = cards[0];
        // Since clicking the first card starts a game, we will click a card
        // first before doing anything else.
        await userEvent.click(firstCard);
        const cardValue = firstCard.getAttribute('data-value');
        const secondCard = cards.find(card => (card.getAttribute('data-value') === cardValue && card !== firstCard));
    
        // Ensure both cards exist and are different elements
        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
        expect(firstCard).not.toBe(secondCard);
    
        await userEvent.click(secondCard);
        expect(firstCard).toHaveClass('card-matched');
        expect(secondCard).toHaveClass('card-matched');
        });

    test('unflips cards when two non-matching cards are already flipped and a third is clicked', () => {
        renderWithRouter(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start game by clicking card (also reshuffles cards so do this before finding a matching card)
        
        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== firstCard.getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
        
        const thirdCard = cards.find(card => card.getAttribute('data-value') !== firstCard.getAttribute('data-value') && card.getAttribute('data-value') !== nonMatchingCard.getAttribute('data-value'));
        fireEvent.click(thirdCard);

        expect(firstCard).toHaveClass('card-facedown');
        expect(nonMatchingCard).toHaveClass('card-facedown');
        expect(thirdCard).toHaveClass('card-faceup');
    });

    test('keeps cards flipped when two matching cards are flipped', () => {
        renderWithRouter(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start game by clicking card (also reshuffles cards so do this before finding a matching card)
        
        const matchingCard = cards.find(card => card.getAttribute('data-value') === firstCard.getAttribute('data-value'));
        fireEvent.click(matchingCard);

        expect(firstCard).not.toHaveClass('card-facedown');
        expect(matchingCard).not.toHaveClass('card-facedown');
    });

    // Test suggested by Claude (AI) in response to a request for feedback on my tests
    // This test fails intermittently
    test('increments move count when two cards are flipped', () => {
        renderWithRouter(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });
        const totalPairs = cards.length / 2;
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start the game before doing anything else (also initialise game settings, including shuffling the cards)

        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== cards[0].getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
    
        // Simulate matching all remaining cards to trigger the game over modal
        cards.slice(2).forEach((card) => { // Create a new array from cards[2] inclusive (excludes first two cards already clicked)
        fireEvent.click(card);
        const matchingCard = cards.find(
            (c) => c !== card && c.getAttribute('data-value') === card.getAttribute('data-value') // Check for a card (c) that is not the same as the current card (card) but with the same data-value attribute
        );
        fireEvent.click(matchingCard);
        });
    
        // Verify that the move count is displayed correctly in the game over modal
        const expectedMoves = totalPairs + 1;
        const moveCountDisplay = screen.getByText(/moves/i);
        expect(moveCountDisplay).toHaveTextContent(`You found all the pairs in ${expectedMoves} moves.`);
    });

    // This test fails intermittently
    test('displays game over modal when all pairs are matched', async () => {
        renderWithRouter(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start the game before doing anything else (also initialise game settings, including shuffling the cards)

        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== cards[0].getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
    
        // Simulate matching all remaining cards to trigger the game over modal
        cards.slice(2).forEach((card) => { // Create a new array from cards[2] inclusive (excludes first two cards already clicked)
        fireEvent.click(card);
        const matchingCard = cards.find(
            (c) => c !== card && c.getAttribute('data-value') === card.getAttribute('data-value') // Check for a card (c) that is not the same as the current card (card) but with the same data-value attribute
        );
        fireEvent.click(matchingCard);
        });
        // Assert: Game Over text displays in the DOM
        const gameOverMessage = screen.getByText(/Game Over!/i);
        expect(gameOverMessage).toBeInTheDocument();
    });
});