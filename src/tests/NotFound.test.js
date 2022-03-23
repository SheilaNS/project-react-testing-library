import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  it('Verifica se a página tem um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const text = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('Verifica se a página tem uma imagem com o caminho "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(image.src).toBe(URL);
  });
});
