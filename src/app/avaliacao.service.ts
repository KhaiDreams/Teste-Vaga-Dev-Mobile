import { Injectable } from '@angular/core';
import { Avaliacao } from './avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private avaliacoes: Avaliacao[] = [];

  constructor() {}

  adicionarAvaliacao(avaliacao: Avaliacao) {
    this.avaliacoes.push(avaliacao);
  }

  listarAvaliacoes(): Avaliacao[] {
    return this.avaliacoes;
  }

  obterAvaliacao(index: number): Avaliacao | undefined {
    return this.avaliacoes[index];
  }

  editarAvaliacao(index: number, avaliacao: Avaliacao) {
    const existingAvaliacao = this.avaliacoes[index];
    if (existingAvaliacao) {
      this.avaliacoes[index] = { ...existingAvaliacao, ...avaliacao };
    }
  }  
}