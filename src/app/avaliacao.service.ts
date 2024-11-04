import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Avaliacao } from './avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageInitialized = true;
  }

  async adicionarAvaliacao(avaliacao: Avaliacao) {
    const avaliacoes = await this.obterAvaliacoes();
    avaliacoes.push(avaliacao);
    await this.storage.set('avaliacoes', avaliacoes);
  }

  async listarAvaliacoes(): Promise<Avaliacao[]> {
    return this.obterAvaliacoes();
  }

  async obterAvaliacao(index: number): Promise<Avaliacao | undefined> {
    const avaliacoes = await this.obterAvaliacoes();
    return avaliacoes[index];
  }

  async editarAvaliacao(index: number, avaliacao: Avaliacao) {
    const avaliacoes = await this.obterAvaliacoes();
    if (avaliacoes[index]) {
      avaliacoes[index] = { ...avaliacoes[index], ...avaliacao };
      await this.storage.set('avaliacoes', avaliacoes);
    }
  }

  private async obterAvaliacoes(): Promise<Avaliacao[]> {
    return (await this.storage.get('avaliacoes')) || [];
  }
}
