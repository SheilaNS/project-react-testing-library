import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon.js', () => {
  const MORE = 'More details';
  const PIKACHU = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      weight: '6.0',
      measure: 'kg',
    },
  ];

  it('Verifica se o card mostra as informações corretas do pokemon Pikchu', () => {
    renderWithRouter(<App />);

    PIKACHU.forEach((data) => {
      const name = screen.getByTestId('pokemon-name');
      expect(name.innerHTML).toBe(data.name);
      const type = screen.getByTestId('pokemon-type');
      expect(type.innerHTML).toBe(data.type);
      const weight = screen.getByTestId('pokemon-weight');
      expect(weight.innerHTML).toBe(`Average weight: ${data.weight} ${data.measure}`);
      const image = screen.getByRole('img');
      expect(image.src).toBe(data.image);
      expect(image.alt).toBe(`${data.name} sprite`);
    });
  });

  it('Verifica se o card do Pikachu possui um link de "More details"', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: MORE });
    const hasPath = link.href.includes(`/pokemons/${PIKACHU[0].id}`);
    expect(hasPath).toBeTruthy();
  });

  it('Verifica se ao clicar no link "More details" a página é'
  + ' redirecionada para o link /pokemons/25', () => {
    const { history } = renderWithRouter(<App />);

    const more = screen.getByRole('link', { name: MORE });
    expect(more).toBeInTheDocument();
    const hasPath = more.href.includes(`/pokemons/${PIKACHU[0].id}`);
    expect(hasPath).toBeTruthy();

    userEvent.click(more);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${PIKACHU[0].id}`);

    const checkPage = screen.getByRole('heading',
      { name: 'Pikachu Details', level: 2 });
    expect(checkPage).toBeInTheDocument();
  });

  it('verifica se aparece a imagem de estrela quando o pokemom é fevoritado', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();

    const more = screen.getByRole('link', { name: MORE });
    expect(more).toBeInTheDocument();
    userEvent.click(more);

    const fav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(fav).toBeInTheDocument();
    userEvent.click(fav);

    userEvent.click(homeLink);

    const star = screen.getByRole('img',
      { name: `${PIKACHU[0].name} is marked as favorite` });
    const hasPath = star.src.includes('/star-icon.svg');
    expect(hasPath).toBeTruthy();
    expect(star.alt).toBe(`${PIKACHU[0].name} is marked as favorite`);
  });
});
