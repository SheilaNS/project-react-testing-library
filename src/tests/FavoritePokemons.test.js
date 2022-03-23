import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it('Verifica se, ao carregar a página, o texto "No favorite'
  + ' pokemon found" aparece na tela', () => {
    renderWithRouter(<FavoritePokemons />);
    const TEXT = 'No favorite pokemon found';

    const text = screen.getByText(TEXT);
    expect(text).toBeInTheDocument();
  });

  it('Verifica se os pokemons favoritados aparece na página', () => {
    renderWithRouter(<App />);

    const getRole = (role, name) => screen.getByRole(role, { name });
    const LINK = 'link';
    const MORE = 'More details';
    const CHECK = 'checkbox';
    const FAV = 'Pokémon favoritado?';
    const BTN = 'button';
    const NUM = 3;

    const homeLink = getRole('link', 'Home');
    expect(homeLink).toBeInTheDocument();
    const favLink = getRole('link', 'Favorite Pokémons');
    expect(favLink).toBeInTheDocument();

    const more = getRole(LINK, MORE);
    expect(more).toBeInTheDocument();
    userEvent.click(more);

    const fav = getRole(CHECK, FAV);
    expect(fav).toBeInTheDocument();
    userEvent.click(fav);

    userEvent.click(homeLink);

    const poisonBtn = getRole(BTN, 'Poison');
    expect(poisonBtn).toBeInTheDocument();
    userEvent.click(poisonBtn);

    const more1 = getRole(LINK, MORE);
    expect(more1).toBeInTheDocument();
    userEvent.click(more1);

    const fav2 = getRole(CHECK, FAV);
    expect(fav2).toBeInTheDocument();
    userEvent.click(fav2);

    userEvent.click(homeLink);

    const fireBtn = getRole(BTN, 'Fire');
    expect(fireBtn).toBeInTheDocument();
    userEvent.click(fireBtn);

    const more2 = getRole(LINK, MORE);
    expect(more2).toBeInTheDocument();
    userEvent.click(more2);

    const fav3 = getRole(CHECK, FAV);
    expect(fav3).toBeInTheDocument();
    userEvent.click(fav3);

    userEvent.click(favLink);

    const favList = screen.queryAllByTestId('pokemon-name');
    expect(favList).toHaveLength(NUM);
  });
});
