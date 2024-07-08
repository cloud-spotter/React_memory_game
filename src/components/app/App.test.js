// tests/integration/App.test.js
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  // Helper function to render the App component within a MemoryRouter context.
  // This is necessary because App uses React Router, which requires a Router context to function properly in tests.
  // The function allows specifying a custom route, defaulting to '/'.
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    );
  };
  
  test('renders header with game title', () => {
    renderWithRouter(<App />);
    
    // Check that the title features, agnostic of how it's structured in the HTML
    const headerContainer = screen.getByRole('heading'); // Get the header container   
    // Use within to scope the query to the header container
    const gameTitle = within(headerContainer).getByText((content, element) => {
      return /Memory\s*Game/i.test(element.textContent); // Regex matching to check for title in case insensitive way ('i' flag), allowing for any whitespace ('\s*')
    });

    expect(gameTitle).toBeInTheDocument();
  });

  test('renders Home page content', () => {
    renderWithRouter(<App />);
    
    // Check for Play button
    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();

    // Check for card set options
    const animalCardSet = screen.getByRole('button', { name: /Animals card set/i });
    expect(animalCardSet).toBeInTheDocument();
    const totoroCardSet = screen.getByRole('button', { name: /Totoro card set/i });
    expect(totoroCardSet).toBeInTheDocument();

    // Check for grid size options
    const gridSizeOptions = screen.getAllByRole('button', { name: /\d x \d/i });  //\d: regex special character that matches any single digit from 0 to 9

    expect(gridSizeOptions.length).toBe(3);
    expect(screen.getByRole('button', { name: '3 x 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4 x 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '6 x 4' })).toBeInTheDocument();
  });

  test('renders Footer component on game page', () => {
    // Render the app with the game page route
    renderWithRouter(<App />, { route: '/game?gridSize=4x4' });
    
    // Check for the footer element
    const footerElement = screen.getByLabelText('Footer with image attribution');
    expect(footerElement).toBeInTheDocument();
    
    // Check for the specific attribution text
    expect(footerElement).toHaveTextContent(/Totoro images: imgbin.com/i);
    expect(footerElement).toHaveTextContent(/Animal images: flaticon.com \(Freepik\)/i);
  });
});