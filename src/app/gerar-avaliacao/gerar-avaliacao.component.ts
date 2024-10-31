import { Component } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { Avaliacao } from '../avaliacao.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gerar-avaliacao',
  templateUrl: './gerar-avaliacao.component.html',
  styleUrls: ['./gerar-avaliacao.component.scss'],
})
export class GerarAvaliacaoComponent {
  avaliacao: Avaliacao = {
    placa: '',
    chassi: '',
    marcaModelo: '',
    hodometro: 0,
    motor: '',
    fotos: [],
    video: '',
    dataRegistro: new Date(),
  };

  constructor(
    private avaliacaoService: AvaliacaoService,
    private toastController: ToastController
  ) {}

  async tirarFoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
    });

    if (image.base64String) {
      this.avaliacao.fotos.push(image.base64String);
      this.showToast('Foto tirada com sucesso!');
    } else {
      this.showToast('Erro ao tirar a foto.');
    }
  }

  async escolherDaGaleria() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 90,
    });

    if (image.base64String) {
      this.avaliacao.fotos.push(image.base64String);
      this.showToast('Foto selecionada com sucesso!');
    } else {
      this.showToast('Erro ao selecionar a foto.');
    }
  }

  escolherVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Armazena o vídeo na avaliação
      this.avaliacao.video = URL.createObjectURL(file); 
      this.showToast('Vídeo selecionado com sucesso!');
    } else {
      this.showToast('Erro ao selecionar o vídeo.');
    }
  }

  salvarAvaliacao() {
    this.avaliacao.dataRegistro = new Date();
    this.avaliacaoService.adicionarAvaliacao(this.avaliacao);
    this.avaliacao = {
      placa: '',
      chassi: '',
      marcaModelo: '',
      hodometro: 0,
      motor: '',
      fotos: [],
      video: '',
      dataRegistro: new Date(),
    };
    this.showToast('Avaliação salva com sucesso!');
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
