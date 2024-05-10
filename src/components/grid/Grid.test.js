// tests/integration/Grid.test.js
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Grid from './Grid';
import Card from '../card/Card';

describe('Grid', () => {
  const mockCards = Array(16).fill().map((_, i) => ({ value: i, isFlipped: false }));  
  const mockHandleCardClick = jest.fn(); 
  
  test('renders a grid of cards', () => {
      render(<Grid cards={mockCards} handleCardClick={mockHandleCardClick} />); // Need to pass Grid the required props now, since lifting card isFlipped state management up to GameBoard (parent component)
      const cards = screen.getAllByRole('button', { name: "Card facedown"});
      expect(cards).toHaveLength(16);
    });

    test('shuffles the cards randomly each render', () => {
      const { container: firstContainer } = render(<Grid cards={mockCards} handleCardClick={mockHandleCardClick} />);
      const firstContainerElement = firstContainer.querySelector('.grid'); // Find the grid container element
      firstContainerElement.querySelectorAll('.card-facedown').forEach(card => {
        fireEvent.click(card); // Simulate click event on each card (do this one at a time!)
      });
      const firstRenderValues = getCardValues(firstContainerElement);

      cleanup(); // Remember to import from testing library. Unmounts React trees that were mounted with render.

      const { container: secondContainer } = render(<Grid />);
      const secondContainerElement = secondContainer.querySelector('.grid');
      secondContainerElement.querySelectorAll('.card-facedown').forEach(card => {
        fireEvent.click(card); // Simulate click event on each card, one after the other
      });
      const secondRenderValues = getCardValues(secondContainerElement);

      expect(areArraysDifferent(firstRenderValues, secondRenderValues)).toBe(true);
    });
});
