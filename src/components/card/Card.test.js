// tests/unit/Card.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../src/components/card/Card';

// Commented out to start with App.test.js

// describe('Card', () => {
//   test('renders a facedown card by default', () => {
//     render(<Card />);
//     const card = screen.getByRole('button', { name: /card/i });
//     expect(card).toHaveClass('card-facedown');
//   });

//   test('flips the card when clicked', () => {
//     render(<Card />);
//     const card = screen.getByRole('button', { name: /card/i });
//     userEvent.click(card);
//     expect(card).not.toHaveClass('card-facedown');
//   });

//   test('displays the card symbol when flipped', () => {
//     render(<Card symbol="A" />);
//     const card = screen.getByRole('button', { name: /card/i });
//     userEvent.click(card);
//     const symbol = screen.getByText('A');
//     expect(symbol).toBeInTheDocument();
//   });
// });