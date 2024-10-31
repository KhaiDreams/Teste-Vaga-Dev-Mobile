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
}
