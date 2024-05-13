// tests/unit/Card.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card'

describe('Card', () => {
  const mockCardFacedown = {
    value: 'A',
    isFlipped: false,
    isMatched: false
  };
  // Update mock card to reflect flipped state
  const mockCardFaceup = {
    ...mockCardFacedown, // Copy properties of this object to new mock card
    isFlipped: true      // But overwrite isFlipped state
  };

  test('renders a facedown card by default', () => {
    render(<Card card={mockCardFacedown} handleCardClick={() => {}}/>); // Use a no operation function (empty arrow function here) to mock the handler function (to prevent potential runtime error from an undefined prop)
    const card = screen.getByRole('button', { name: "Card facedown" });
    expect(card).toHaveClass('card-facedown');
  });

  
  test('flips the card when clicked, verifying state change in class', () => {
    const mockHandleCardClick = jest.fn();
    
    render(<Card card={mockCardFacedown} handleCardClick={mockHandleCardClick} />);
    
    const cardBeforeClick = screen.getByRole('button', { name: "Card facedown" });
    expect(cardBeforeClick).toHaveClass('card-facedown');
    fireEvent.click(cardBeforeClick); // triggers click event synchronously (rather than userEvent.click(card))
    expect(mockHandleCardClick).toHaveBeenCalled();
    
    // Simulate parent component behaviour (here by updating props through a re-render)
    render(<Card card={mockCardFaceup} handleCardClick={mockHandleCardClick} />);
    // Query Card again to verify changed state
    const cardAfterClick = screen.getByRole('button', { name: 'Card faceup with value A'});
    expect(cardAfterClick).toHaveClass('card-faceup');
  });


  test('displays the card value when flipped and verifies aria-label', () => {
    const mockHandleCardClick = jest.fn();
    render(<Card card={mockCardFacedown} handleCardClick={mockHandleCardClick} />);
    
    const cardBeforeClick = screen.getByRole('button', { name: "Card facedown" });
    fireEvent.click(cardBeforeClick);
    
    // Re-render with card faceup
    render(<Card card={mockCardFaceup} handleCardClick={mockHandleCardClick} />);
    // After flipping, the card should display its value
    const cardAfterClick = screen.getByRole('button', { name: "Card faceup with value A" });
    expect(cardAfterClick).toHaveTextContent("A");

    // Verify the aria-label has been updated to reflect the card's new state
    expect(cardAfterClick).toHaveAttribute('aria-label', 'Card faceup with value A');
  });
});