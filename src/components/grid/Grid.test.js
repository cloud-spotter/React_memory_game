// tests/integration/Grid.test.js
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Grid from './Grid';

describe('Grid', () => {
    test('renders a grid of cards', () => {
      render(<Grid />);
      const cards = screen.getAllByRole('button', { name: "Card facedown"});
      expect(cards).toHaveLength(16);
    });

    test('shuffles the cards randomly each render', () => {
      const { container: firstContainer } = render(<Grid />);
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
