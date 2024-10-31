export interface Avaliacao {
  placa: string;
  chassi: string;
  marcaModelo: string;
  hodometro: number;
  motor: string;
  fotos: string[];
  video?: string;
  dataRegistro: Date;
  imagemPlaca: string;
  imagemChassi: string;
  imagemHodometro: string;
  imagemMotor: string;
}
