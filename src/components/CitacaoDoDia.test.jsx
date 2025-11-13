import React from 'react';
import { render, screen } from '@testing-library/react';
// Importando as funções de teste do 'vitest' e 'vi' para mocks
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CitacaoDoDia from './CitacaoDoDia';

// Configura o mock do 'fetch' antes de cada teste
beforeEach(() => {
  // Limpa os mocks anteriores para que um teste não interfira no outro
  vi.restoreAllMocks();
});

describe('Componente CitacaoDoDia (com API)', () => {

  it('deve exibir o estado de carregamento inicialmente', () => {
    // Simula uma API que nunca responde, para o "Carregando..." ficar na tela
    vi.spyOn(global, 'fetch').mockImplementation(() => 
      new Promise(() => {}) // Cria uma promessa que nunca resolve
    );
    
    render(<CitacaoDoDia />);
    
    // O teste síncrono VAI encontrar o "Carregando..."
    expect(screen.getByText(/carregando inspiração/i)).toBeInTheDocument();
  });

  // O teste 'it' agora é 'async' para podermos usar 'await'
  it('deve exibir a citação e o autor após a API responder', async () => {
    
    // Primeiro: criar o nosso "mock" (resposta falsa) da API
    const mockResponse = {
      quote: "O sucesso é a soma de pequenos esforços.",
      author: "Robert Collier"
    };
    
    // Segundo: dizer ao 'fetch' para "fingir" que respondeu com sucesso
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true
    });

    // Terceiro: renderizar o componente
    render(<CitacaoDoDia />);

    // Quarto: Usar 'findByText' (assíncrono) para ESPERAR o texto aparecer
    // Ele vai esperar o 'useEffect' rodar, o 'fetch' (mock) responder,
    // o estado atualizar, e o componente re-renderizar.
    
    const citacaoText = await screen.findByText(/"O sucesso é a soma de pequenos esforços."/i);
    const autorText = await screen.findByText(/— Robert Collier/i);

    // Quinto: verificar se os textos estão no documento
    expect(citacaoText).toBeInTheDocument();
    expect(autorText).toBeInTheDocument();
    
    // Sexto: verificar se o "Carregando..." desapareceu
    expect(screen.queryByText(/carregando inspiração/i)).not.toBeInTheDocument();
  });
});