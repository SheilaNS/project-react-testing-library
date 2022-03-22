import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About.js', () => {
  it('Verifica se a página contém um headin com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const notFound = screen.getByRole('heading',
      { name: /About Pokédex/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se a imagem com o caminho "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png" existe na página', () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image.src).toBe(URL);
  });

  it('Verifica se a página tem um parágrafo com o seguinte texto "This application'
  + 'simulates a Pokédex, a digital encyclopedia containing all Pokémons"', () => {
    renderWithRouter(<About />);
    const TEXT = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';

    const text = screen.getByText(TEXT);
    expect(text).toBeInTheDocument();
  });

  it('Verifica se a página tem um parágrafo com o seguinte texto "One can filter'
  + ' Pokémons by type, and see more details for each one of them"', () => {
    renderWithRouter(<About />);
    const TEXT = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';

    const text = screen.getByText(TEXT);
    expect(text).toBeInTheDocument();
  });

  it('Verifica se a página tem 2 parágrafos de texto', () => {
    renderWithRouter(<About />);

    const words = screen.queryAllByText(/Pokémons/i);
    expect(words).toHaveLength(2);
  });
});
