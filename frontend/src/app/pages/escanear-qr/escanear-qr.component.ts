// src/app/pages/escanear-qr/escanear-qr.component.ts
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AngularHtmlQrcodeComponent,
  AngularHtmlQrcodeService
} from 'angular-html5-qrcode';
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';

@Component({
  selector: 'app-escanear-qr',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularHtmlQrcodeComponent],
  templateUrl: './escanear-qr.component.html',
  styleUrls: ['./escanear-qr.component.css']
})
export class EscanearQrComponent implements OnDestroy {

  @ViewChild(AngularHtmlQrcodeComponent) scanner?: AngularHtmlQrcodeComponent;

  // Solo escaneamos códigos QR
  formatosSoportados = [Html5QrcodeSupportedFormats.QR_CODE];

  // Resultado del último escaneo
  matriculaEscaneada: string = '';
  escaneoExitoso: boolean = false;
  mensajeError: string = '';

  // Para evitar procesar el mismo QR múltiples veces seguidas
  private ultimoTextoEscaneado: string = '';
  private tiempoUltimoEscaneo: number = 0;

  constructor(private qrService: AngularHtmlQrcodeService) {}

  handleScanSuccess(event: { decodedText: string; result: any }): void {
    const textoDecodificado = event.decodedText;

    const ahora = Date.now();

    // Si es el mismo texto y pasaron menos de 3 segundos, ignorar
    if (textoDecodificado === this.ultimoTextoEscaneado && (ahora - this.tiempoUltimoEscaneo) < 3000) {
      return;
    }

    this.ultimoTextoEscaneado = textoDecodificado;
    this.tiempoUltimoEscaneo = ahora;

    // Pausar la cámara tras un escaneo exitoso
    this.qrService.pause(true);

    this.matriculaEscaneada = textoDecodificado;
    this.escaneoExitoso = true;
    this.mensajeError = '';

    // TODO: aquí se llamará a AsistenciaService.registrar(this.matriculaEscaneada)
    console.log('Matrícula escaneada:', textoDecodificado);
  }

  handleScanError(error: any): void {
    // Los errores de escaneo son normales (frames sin QR), no los mostramos como error
    // Solo mostramos errores críticos como permiso denegado
    if (error?.name === 'NotAllowedError') {
      this.mensajeError = 'Permiso de cámara denegado. Habilítalo en la configuración del navegador.';
    }
  }

  reanudarEscaneo(): void {
    this.escaneoExitoso = false;
    this.matriculaEscaneada = '';
    this.ultimoTextoEscaneado = '';
    this.mensajeError = '';
    this.qrService.resume();
  }

  ngOnDestroy(): void {
    // Liberar la cámara al salir de la pantalla
    this.qrService.clear();
  }
}
