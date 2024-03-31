// tests/unit/Card.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; //TODO: Delete if not needed
import Card from './Card'

describe('Card', () => {
  test('renders a facedown card by default', () => {
    render(<Card value="A" />);
    const card = screen.getByRole('button', { name: '' });
    expect(card).toHaveClass('card-facedown');
  });

  test('flips the card when clicked', () => {
    const value = "A"
    render(<Card value={value} />);
    
    const card = screen.getByRole('button', { name: '' });
    expect(card).toHaveClass('card-facedown');
    
    fireEvent.click(card); // triggers click event synchronously (rather than userEvent.click(card))
    expect(card).toHaveClass('card-faceup');
    expect(card).toHaveTextContent(value);
  });

  test('displays the card value when flipped', () => {
    const value = "A"
    render(<Card value={value} />);

    const card = screen.getByRole('button', { name: "" });
    fireEvent.click(card);
    expect(card).toHaveTextContent(value);
  });
});