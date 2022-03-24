import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const PATH = '/pokemons/25';
const MORE = 'More details';
const FAVPOKE = 'Pokémon favoritado?';

describe('Testa o componente PokemonDetails.js.'
+ ' Verifica se as informações detalhadas:', () => {
  it('Ao carregar a página deve ter o texto "Pikachu Details"', () => {
    renderWithRouter(<App />);

    const moreDet = screen.getByRole('link',
      { name: MORE });
    expect(moreDet).toBeInTheDocument();

    userEvent.click(moreDet);

    const text = screen.getByRole('heading',
      { name: 'Pikachu Details', level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('O link "More details" não deve mais aparecer na página', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const moreDet = screen.queryByRole('link',
      { name: MORE });
    expect(moreDet).not.toBeInTheDocument();
  });

  it('Deve ter um h2 com o texto "Summary"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const text = screen.getByRole('heading',
      { name: 'Summary', level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('Deve ter o texto "This intelligent Pokémon roasts hard berries with'
  + ' electricity to make them tender enough to eat."', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const text = screen.getByText('This intelligent Pokémon roasts hard berries with'
    + ' electricity to make them tender enough to eat.');
    expect(text).toBeInTheDocument();
  });
});

describe('Testa se existe na página uma seção com os mapas'
+ ' contendo as localizações do pokémon', () => {
  it('Verifica se existe um h2 com o texto "Game Locations of Pikachu"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const text = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu', level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('Verifica se as localizações do Pikachu aparecem na seção de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const getSec = screen.queryAllByRole('img', { name: /location/i });
    expect(getSec).toHaveLength(2);
  });

  it('As imagens da localização devem ter src com a URL da localização'
  + ' e alt com o texto "Pikachu location"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const LOC = [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ];

    const image = screen.queryAllByRole('img', { name: 'Pikachu location' });
    LOC.forEach((map, index) => {
      expect(image[index].src).toBe(map.map);
    });
  });
});

describe('Teste se o usuário pode favoritar um pokémon através da'
+ ' página de detalhes', () => {
  it('A página deve exibir uma label com o texto "Pokémon favoritado?" e um input'
  + 'do tipo checbox', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const input = screen.getByLabelText(FAVPOKE, { selector: 'input' });
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('checkbox');
  });

  it('Cliques alternados no checkbox devem adicionar e remover'
  + ' respectivamente o Pokémon da lista de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    const input = screen.getByLabelText(FAVPOKE, { selector: 'input' });
    expect(input).toBeInTheDocument();

    userEvent.click(input);
    expect(input.checked).toBeTruthy();

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favLink).toBeInTheDocument();

    userEvent.click(favLink);

    const favList = screen.queryAllByTestId('pokemon-name');
    expect(favList).toHaveLength(1);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);

    const moreDet = screen.getByRole('link', { name: MORE });
    expect(moreDet).toBeInTheDocument();
    userEvent.click(moreDet);

    const input2 = screen.getByLabelText(FAVPOKE, { selector: 'input' });
    expect(input2).toBeInTheDocument();
    expect(input2.checked).toBeTruthy();

    userEvent.click(input2);
    expect(input2.checked).toBeFalsy();
    userEvent.click(favLink);

    const favList1 = screen.queryAllByTestId('pokemon-name');
    expect(favList1).toHaveLength(0);
  });
});
