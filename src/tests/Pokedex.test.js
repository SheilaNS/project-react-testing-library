import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex.js', () => {
  const NEXT = 'Próximo pokémon';
  it('Verifica se a página tem um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('Verifica se aparece apenas um pokemon na tela por vez', () => {
    renderWithRouter(<App />);

    let poke = screen.getByText('Pikachu');
    expect(poke).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: NEXT });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    poke = screen.getByText('Charmander');
    const pokeGone = screen.queryByText('Pikachu');
    expect(poke).toBeInTheDocument();
    expect(pokeGone).not.toBeInTheDocument();
  });

  it('Verifica se a página tem um botão All que, ao ser '
  + 'clicado, mostra todos os tipos de pokemons', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    const electricBtn = screen.getByRole('button', { name: 'Electric' });
    expect(electricBtn).toBeInTheDocument();

    userEvent.click(electricBtn);

    const nextBtn = screen.getByRole('button', { name: NEXT });
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();

    userEvent.click(allBtn);

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeFalsy();

    userEvent.click(nextBtn);

    const charm = screen.getByTestId('pokemon-name');
    expect(charm.innerHTML).toBe('Charmander');
  });

  it('Verifica se o próximo pokemon da lista aparece quando'
  + ' o botão "Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const POKELIST = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    POKELIST.forEach((pokemon) => {
      const poke = screen.getByTestId('pokemon-name');
      expect(poke.innerHTML).toBe(pokemon);
      const next = screen.getByRole('button', { name: NEXT });
      userEvent.click(next);
    });
  });

  it('Verifica se os botões de filtro estão na tela', () => {
    renderWithRouter(<App />);

    const BTNLIST = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
    BTNLIST.forEach((btn, index) => {
      expect(all).toBeInTheDocument();
      const showBtn = screen.queryAllByTestId('pokemon-type-button');
      expect(showBtn[index].innerHTML).toBe(btn);
      expect(all).toBeInTheDocument();
    });
  });
});
