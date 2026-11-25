// src/app/pages/recuperar-password/recuperar-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

type Paso = 'solicitar' | 'restablecer' | 'exito';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  paso: Paso = 'solicitar';

  // Paso 1
  correo: string = '';

  // Paso 2
  codigo: string = '';
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  cargando: boolean = false;
  errorMensaje: string = '';
  infoMensaje: string = '';

  constructor(private router: Router) {}

  // ---------- Paso 1: solicitar código ----------
  solicitarCodigo(): void {
    this.errorMensaje = '';
    this.infoMensaje = '';

    if (!this.correo || !this.correo.includes('@')) {
      this.errorMensaje = 'Ingresa un correo válido.';
      return;
    }

    this.cargando = true;

    // TODO: reemplazar por AuthService.solicitarCodigo(this.correo)
    setTimeout(() => {
      this.cargando = false;
      this.paso = 'restablecer';
      this.infoMensaje = `Enviamos un código a ${this.correo}. Revisa tu bandeja.`;
    }, 800);
  }

  // ---------- Paso 2: restablecer contraseña ----------
  restablecerPassword(): void {
    this.errorMensaje = '';

    if (!this.codigo || this.codigo.length < 4) {
      this.errorMensaje = 'Ingresa el código que recibiste.';
      return;
    }
    if (!this.nuevaPassword || this.nuevaPassword.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    // TODO: reemplazar por AuthService.restablecerPassword(...)
    setTimeout(() => {
      this.cargando = false;
      this.paso = 'exito';
    }, 800);
  }

  volverAlLogin(): void {
    this.router.navigate(['/login']);
  }

  reintentar(): void {
    this.paso = 'solicitar';
    this.correo = '';
    this.codigo = '';
    this.nuevaPassword = '';
    this.confirmarPassword = '';
    this.errorMensaje = '';
    this.infoMensaje = '';
  }
}
