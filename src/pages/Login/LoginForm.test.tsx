import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { useLogin } from './hooks';
import { vi } from 'vitest';

vi.mock('./hooks', () => ({
  useLogin: vi.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      redirectToRegister: vi.fn(),
      onSubmit: vi.fn(),
      password: '',
      setPassword: vi.fn(),
      username: '',
      setUsername: vi.fn(),
      loading: false,
      register: vi.fn(),
      handleSubmit: (fn: any) => (e: any) => {
        e.preventDefault();
        fn();
      },
      errors: {},
    });
  });

  it('Exibe corretamente os campos de entrada', () => {
    render(<LoginForm />);

    screen.getByPlaceholderText('User');
    screen.getByPlaceholderText('Password');
    screen.getByText('Sign In');
  });

  it('Usuário pode clicar no lembre-se', () => {
    render(<LoginForm />);

    const rememberLink = screen.getByText('Remember me');
    fireEvent.click(rememberLink);
  });

  it('Exibe corretamente os logos', () => {
    render(<LoginForm />);

    screen.getByAltText('Logo Zilia');
    screen.getByAltText('Logo iRMA');
  });

  it('Deve atualizar o username e password ao digitar nos campos', () => {
    const setUsername = vi.fn();
    const setPassword = vi.fn();

    (useLogin as jest.Mock).mockReturnValue({
      redirectToRegister: vi.fn(),
      onSubmit: vi.fn(),
      password: '',
      setPassword,
      username: '',
      setUsername,
      loading: false,
      register: vi.fn(),
      handleSubmit: vi.fn(),
      errors: {},
    });

    render(<LoginForm />);

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(setUsername).toHaveBeenCalledWith('testuser');
    expect(setPassword).toHaveBeenCalledWith('testpassword');
  });
});
