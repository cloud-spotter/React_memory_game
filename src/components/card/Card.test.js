// tests/unit/Card.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card'

describe('Card', () => {
  const mockCardFacedown = {
    image: '/images/animal_card_set/beaver.png',
    isFlipped: false,
    isMatched: false,
    description: 'Image of beaver',
    id: 1
  };
  
  const mockCardFaceup = {
    image: '/images/animal_card_set/beaver.png',
    isFlipped: true,
    isMatched: false,
    description: 'Image of beaver',
    id: 1
  };

  test('renders a facedown card by default', () => {
    render(<Card card={mockCardFacedown} handleCardClick={() => {}}/>); // Use a no operation function (empty arrow function here) to mock the handler function (to prevent potential runtime error from an undefined prop)
    const card = screen.getByRole('button', { name: /Card 1 facedown/i });
    expect(card).toHaveClass('card-facedown');
  });

  
  test('flips the card when clicked, verifying state change in class', () => {
    const mockHandleCardClick = jest.fn();
    
    render(<Card card={mockCardFacedown} handleCardClick={mockHandleCardClick} />);
    
    const cardBeforeClick = screen.getByRole('button', { name: /Card 1 facedown/i });
    expect(cardBeforeClick).toHaveClass('card-facedown');
    fireEvent.click(cardBeforeClick); // triggers click event synchronously (rather than userEvent.click(card))
    expect(mockHandleCardClick).toHaveBeenCalled();
    
    // Simulate parent component behaviour (here by updating props through a re-render)
    render(<Card card={mockCardFaceup} handleCardClick={mockHandleCardClick} />);
    // Query Card again to verify changed state
    const cardAfterClick = screen.getByRole('button', { name: /Flipped card: Image of beaver/i});
    expect(cardAfterClick).toHaveClass('card-faceup');
  });


  test('displays the card image when flipped', () => {
    const mockHandleCardClick = jest.fn();
    render(<Card card={mockCardFacedown} handleCardClick={mockHandleCardClick} />);
    
    const cardBeforeClick = screen.getByRole('button', { name: /Card 1 facedown/i });
    fireEvent.click(cardBeforeClick);
    
    // Re-render with card faceup
    render(<Card card={mockCardFaceup} handleCardClick={mockHandleCardClick} />);
    // After flipping, the card should display its image
    const cardAfterClick = screen.getByRole('button', { name: /Flipped card: Image of beaver/i }); // Query the button element representing the card first
    const cardImage = cardAfterClick.querySelector('img'); // Then, query the img element within the button
    expect(cardImage).toHaveAttribute('src', mockCardFaceup.image);  // Check the img element has the correct src attribute

    // Verify the aria-label has been updated to reflect the card's new state         // TODO: update test and code to include better aria-labels for images
  //   expect(cardAfterClick).toHaveAttribute('aria-label', 'Card faceup with value A');
  });
});