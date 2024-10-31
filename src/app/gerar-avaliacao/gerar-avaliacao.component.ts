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
  };

  private isEditMode: boolean = false; // Flag para modo de edição
  private avaliacaoIndex: number | null = null; // Armazenar o índice da avaliação a ser editada

  constructor(
    private avaliacaoService: AvaliacaoService,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params['index']) {
        this.isEditMode = true; // Estamos no modo de edição
        this.avaliacaoIndex = Number(params['index']); // Captura o índice da avaliação
        const avaliacao = this.avaliacaoService.obterAvaliacao(this.avaliacaoIndex);
        if (avaliacao) {
          this.avaliacao = { ...avaliacao }; // Carregar a avaliação no formulário
        }
      }
    });
  }

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
      this.avaliacao.video = URL.createObjectURL(file);
      this.showToast('Vídeo selecionado com sucesso!');
    } else {
      this.showToast('Erro ao selecionar o vídeo.');
    }
  }

  salvarAvaliacao() {
    if (!this.avaliacao.placa || !this.avaliacao.chassi || !this.avaliacao.marcaModelo || !this.avaliacao.hodometro || !this.avaliacao.motor || this.avaliacao.fotos.length === 0) {
      this.showToast('Todos os campos e pelo menos uma foto são obrigatórios!');
      return;
    }

    this.avaliacao.dataRegistro = new Date();
    
    if (this.isEditMode && this.avaliacaoIndex !== null) {
      // Editando a avaliação
      this.avaliacaoService.editarAvaliacao(this.avaliacaoIndex, this.avaliacao);
      this.showToast('Avaliação editada com sucesso!');
    } else {
      // Adicionando nova avaliação
      this.avaliacaoService.adicionarAvaliacao(this.avaliacao);
      this.showToast('Avaliação salva com sucesso!');
    }

    this.resetarFormulario(); // Resetando o formulário após salvar
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
    };
    this.avaliacaoIndex = null; // Resetando o índice
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
