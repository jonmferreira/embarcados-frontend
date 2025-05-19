import * as React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HiddenMessage } from './HiddenMessage';

import { fireEvent } from '@testing-library/react';
import { describe, it } from 'vitest';

// 🟢 Testes de Caixa Preta (Black Box Testing)
describe('Teste caixa preta', () => {
  it('params todos invalidos', () => {
    render(<HiddenMessage />);
  });
  it('params todos validos', () => {
    render(<HiddenMessage message={12}>Teste sucesso</HiddenMessage>);
  });
});

// 🔵 Testes de Caixa Branca (White Box Testing)
describe('Teste caixa branca', () => {
  it('forçando clicks', () => {
    const filho = 'Test Message';
    render(<HiddenMessage message={11}>filho</HiddenMessage>);

    const checkbox = screen.getByTestId('toggle');
    // Simula o clique novamente para esconder a mensagem
    fireEvent.click(checkbox);
    // Verifica se a mensagem está oculta no início
    const text = screen.queryByText(filho);
    screen.debug();
    expect(text).toEqual(null);
  });
});

// 🟠 Testes de Cobertura e Casos Extremos (Coverage & Edge Cases)
describe('Resolução Coverage', () => {
  it('Forçando erro ao passar valores inválidos', () => {
    expect(() => render(<HiddenMessage message={10}>Test Message</HiddenMessage>)).toThrow('Erro');
  });
});
