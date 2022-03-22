import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App.js', () => {
  const LINKS = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Favorite Pokémons',
      path: '/favorites',
    },
  ];

  it('Verifica o texto dos links na ordem', () => {
    const { history } = renderWithRouter(<App />);

    LINKS.forEach((link) => {
      const linkToTest = screen.getByRole('link', { name: link.name });
      expect(linkToTest).toBeInTheDocument();
    });

    history.push('/pikachu');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica o caminho dos links', () => {
    const { history } = renderWithRouter(<App />);

    LINKS.forEach((link) => {
      const linkToTest = screen.getByRole('link', { name: link.name });
      userEvent.click(linkToTest);
      const { pathname } = history.location;
      expect(pathname).toBe(link.path);
    });
  });

  it('Verifica se o texto da página não encontrada é "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pikachu');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
