import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, fireEvent, screen } from '@testing-library/react';

import Home from '../components/Home';

describe('Home', () => {
  beforeEach(() => {
    const client = new QueryClient();

    render(
      <QueryClientProvider client={client}>
        <Home />
      </QueryClientProvider>
    );
  });

  it('adds answer and delete them', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: /add answer/i,
      })
    );

    expect(
      screen.getByPlaceholderText('Enter 3 answer...')
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /delete 3 answer/i,
      })
    );

    expect(
      screen.queryByPlaceholderText('Enter 3 answer...')
    ).not.toBeInTheDocument();
  });

  it('activates create button on title and answers filled', () => {
    expect(
      screen.getByRole('button', {
        name: /create poll/i,
      })
    ).toBeDisabled();

    const title = screen.getByRole('textbox', {
      name: /title/i,
    });
    const answer1 = screen.getByPlaceholderText('Enter 1 answer...');
    const answer2 = screen.getByPlaceholderText('Enter 2 answer...');

    fireEvent.change(title, { target: { value: 'title' } });
    fireEvent.change(answer1, { target: { value: 'answer' } });
    fireEvent.change(answer2, { target: { value: 'answer' } });

    expect(
      screen.getByRole('button', {
        name: /create poll/i,
      })
    ).toBeEnabled();
  });
});
