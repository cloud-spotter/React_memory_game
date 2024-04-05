// tests/unit/Card.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card'

describe('Card', () => {
  test('renders a facedown card by default', () => {
    render(<Card value="A" />);
    const card = screen.getByRole('button', { name: "Card facedown" });
    expect(card).toHaveClass('card-facedown');
  });

  test('flips the card when clicked, verifying state change in class', () => {
    const value = "A";
    render(<Card value={value} />);
    
    const cardBeforeClick = screen.getByRole('button', { name: "Card facedown" });
    expect(cardBeforeClick).toHaveClass('card-facedown');
    
    fireEvent.click(cardBeforeClick); // triggers click event synchronously (rather than userEvent.click(card))
    // Query Card again to verify changed state
    const cardAfterClick = screen.getByRole('button', { name: `Card faceup with value ${value}`});
    expect(cardAfterClick).toHaveClass('card-faceup');
  });

  test('displays the card value when flipped and verifies aria-label', () => {
    const value = "A";
    render(<Card value={value} />);

    const card = screen.getByRole('button', { name: "Card facedown" });
    fireEvent.click(card);
    // After flipping, the card should display its value
    expect(card).toHaveTextContent(value);

    // Verify the aria-label has been updated to reflect the card's new state
    expect(card).toHaveAttribute('aria-label', `Card faceup with value ${value}`);
  });
});