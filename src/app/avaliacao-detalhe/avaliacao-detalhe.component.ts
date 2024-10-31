import { Component, Input } from '@angular/core';
import { Avaliacao } from '../avaliacao.model';

@Component({
  selector: 'app-avaliacao-detalhe',
  templateUrl: './avaliacao-detalhe.component.html',
  styleUrls: ['./avaliacao-detalhe.component.scss'],
})
export class AvaliacaoDetalheComponent {
  @Input() avaliacao!: Avaliacao;

  constructor() {}

  dismiss() {
    console.log('Fechando detalhamento da avaliação');
  }
}
