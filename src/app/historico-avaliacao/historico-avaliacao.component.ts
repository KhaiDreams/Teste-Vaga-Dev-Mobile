import { Component } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { Avaliacao } from '../avaliacao.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-avaliacao',
  templateUrl: './historico-avaliacao.component.html',
  styleUrls: ['./historico-avaliacao.component.scss'],
})
export class HistoricoAvaliacaoComponent {
  avaliacoes: Avaliacao[] = [];

  constructor(private avaliacaoService: AvaliacaoService, private router: Router) {
    this.carregarAvaliacoes();
  }

  async carregarAvaliacoes() {
    this.avaliacoes = await this.avaliacaoService.listarAvaliacoes();
  }

  visualizarAvaliacao(avaliacao: Avaliacao, index: number) {
    this.router.navigate(['/gerar-avaliacao'], {
      queryParams: {
        index: index,
        placa: avaliacao.placa,
        chassi: avaliacao.chassi,
        marcaModelo: avaliacao.marcaModelo,
        hodometro: avaliacao.hodometro,
        motor: avaliacao.motor,
        dataRegistro: avaliacao.dataRegistro,
        fotos: JSON.stringify(avaliacao.fotos),
        video: avaliacao.video,
      },
    });
  }
}
