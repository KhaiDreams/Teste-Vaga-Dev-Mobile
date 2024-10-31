import { Component } from '@angular/core';
import { AvaliacaoService } from '../avaliacao.service';
import { Avaliacao } from '../avaliacao.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
    imagemPlaca: '',
    imagemChassi: '',
    imagemHodometro: '',
    imagemMotor: '',
  };

  private isEditMode: boolean = false;
  private avaliacaoIndex: number | null = null;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params['index']) {
        this.isEditMode = true;
        this.avaliacaoIndex = Number(params['index']);
        const avaliacao = this.avaliacaoService.obterAvaliacao(this.avaliacaoIndex);
        if (avaliacao) {
          this.avaliacao = { ...avaliacao };
        }
      }
    });
  }

  async tirarFoto(tipo: string) {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
    });

    if (image.base64String) {
      if (tipo === 'placa') {
        this.avaliacao.imagemPlaca = image.base64String;
      } else if (tipo === 'chassi') {
        this.avaliacao.imagemChassi = image.base64String;
      } else if (tipo === 'hodometro') {
        this.avaliacao.imagemHodometro = image.base64String;
      } else if (tipo === 'motor') {
        this.avaliacao.imagemMotor = image.base64String;
      }
      this.showToast('Foto tirada com sucesso!');
    } else {
      this.showToast('Erro ao tirar a foto.');
    }
  }

  async escolherDaGaleria(tipo: string) {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 90,
    });

    if (image.base64String) {
      if (tipo === 'placa') {
        this.avaliacao.imagemPlaca = image.base64String;
      } else if (tipo === 'chassi') {
        this.avaliacao.imagemChassi = image.base64String;
      } else if (tipo === 'hodometro') {
        this.avaliacao.imagemHodometro = image.base64String;
      } else if (tipo === 'motor') {
        this.avaliacao.imagemMotor = image.base64String;
      }
      this.showToast('Foto selecionada com sucesso!');
    } else {
      this.showToast('Erro ao selecionar a foto.');
    }
  }

  escolherVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.avaliacao.video = URL.createObjectURL(file);
      this.showToast('Vídeo selecionado com sucesso!');
    } else {
      this.showToast('Erro ao selecionar o vídeo.');
    }
  }

  adicionarFoto() {
    if (this.avaliacao.fotos.length < 5) {
      this.avaliacao.fotos.push('');
      this.showToast('Espaço adicionado para nova foto.');
    } else {
      this.showToast('Você já atingiu o número máximo de fotos.');
    }
  }

  salvarAvaliacao() {
    if (!this.avaliacao.placa || !this.avaliacao.chassi || !this.avaliacao.marcaModelo || !this.avaliacao.hodometro || !this.avaliacao.motor) {
      this.showToast('Todos os campos e imagens são obrigatórios!');
      return;
    }

    this.avaliacao.dataRegistro = new Date();

    if (this.isEditMode && this.avaliacaoIndex !== null) {
      this.avaliacaoService.editarAvaliacao(this.avaliacaoIndex, this.avaliacao);
      this.showToast('Avaliação editada com sucesso!');
    } else {
      this.avaliacaoService.adicionarAvaliacao(this.avaliacao);
      this.showToast('Avaliação salva com sucesso!');
    }

    this.resetarFormulario();
  }

  private resetarFormulario() {
    this.avaliacao = {
      placa: '',
      chassi: '',
      marcaModelo: '',
      hodometro: 0,
      motor: '',
      fotos: [],
      video: '',
      dataRegistro: new Date(),
      imagemPlaca: '',
      imagemChassi: '',
      imagemHodometro: '',
      imagemMotor: '',
    };
    this.avaliacaoIndex = null;
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
