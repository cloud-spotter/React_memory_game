// tests/integration/Grid.test.js
import { render, screen } from '@testing-library/react';
import Grid from './Grid'
import Card from '../card/Card';

describe('Grid', () => {
    test('renders a grid of cards', () => {
      render(<Grid />);
      const cards = screen.getAllByRole('button', { name: 'card-facedown'});
      expect(cards).toHaveLength(16);
    });
});
