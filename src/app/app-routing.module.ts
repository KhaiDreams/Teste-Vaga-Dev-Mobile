import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerarAvaliacaoComponent } from './gerar-avaliacao/gerar-avaliacao.component';
import { HistoricoAvaliacaoComponent } from './historico-avaliacao/historico-avaliacao.component';

const routes: Routes = [
  { path: 'gerar-avaliacao', component: GerarAvaliacaoComponent },
  { path: 'historico-avaliacao', component: HistoricoAvaliacaoComponent },
  { path: '', redirectTo: 'gerar-avaliacao', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
