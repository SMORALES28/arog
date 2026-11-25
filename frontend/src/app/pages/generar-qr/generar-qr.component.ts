// src/app/pages/generar-qr/generar-qr.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-generar-qr',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, QRCodeModule],
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css']
})
export class GenerarQrComponent {

  matricula: string = '';
  matriculaConfirmada: string = '';
  cargando: boolean = false;

  // Configuración del QR
  qrAncho: number = 260;
  qrNivelCorreccion: 'L' | 'M' | 'Q' | 'H' = 'M';

  generar(): void {
    const valor = this.matricula.trim();
    if (!valor) return;

    this.cargando = true;
    // Pequeño retardo solo para que se note el estado de carga
    setTimeout(() => {
      this.matriculaConfirmada = valor;
      this.cargando = false;
    }, 300);
  }

  limpiar(): void {
    this.matricula = '';
    this.matriculaConfirmada = '';
  }

  descargarQr(): void {
    // El QR se renderiza como <canvas> o <img>; lo obtenemos del DOM
    const contenedor = document.querySelector('.qr-canvas-wrapper');
    if (!contenedor) return;

    const canvas = contenedor.querySelector('canvas') as HTMLCanvasElement;
    const img = contenedor.querySelector('img') as HTMLImageElement;

    const enlace = document.createElement('a');
    if (canvas) {
      enlace.href = canvas.toDataURL('image/png');
    } else if (img) {
      enlace.href = img.src;
    } else {
      return;
    }
    enlace.download = `qr-${this.matriculaConfirmada}.png`;
    enlace.click();
  }
}
