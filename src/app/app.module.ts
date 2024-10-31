import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GerarAvaliacaoComponent } from './gerar-avaliacao/gerar-avaliacao.component';
import { HistoricoAvaliacaoComponent } from './historico-avaliacao/historico-avaliacao.component';
import { AvaliacaoDetalheComponent } from './avaliacao-detalhe/avaliacao-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    GerarAvaliacaoComponent,
    HistoricoAvaliacaoComponent,
    AvaliacaoDetalheComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
