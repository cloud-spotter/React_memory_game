// tests/integration/Grid.test.js

describe('Grid', () => {
    test('renders a grid of cards', () => {
      render(<Grid />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(16);
    });
  
//   test('keeps cards flipped when two matching cards are flipped', () => {
//     render(<Grid />);
//     const [card1, card2] = screen.getAllByRole('button', { name: /card/i });
//     card1.setAttribute('data-testid', 'card-1');
//     card2.setAttribute('data-testid', 'card-1');
//     userEvent.click(card1);
//     userEvent.click(card2);
//     expect(card1).not.toHaveClass('card-facedown');
//     expect(card2).not.toHaveClass('card-facedown');
//   });

