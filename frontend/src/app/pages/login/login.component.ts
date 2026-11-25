// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    this.errorMensaje = '';

    if (!this.usuario || !this.password) {
      this.errorMensaje = 'Por favor completa todos los campos.';
      return;
    }

    this.cargando = true;

    // TODO: reemplazar por llamada real al AuthService
    // this.authService.login(this.usuario, this.password).subscribe({ ... })
    setTimeout(() => {
      this.cargando = false;
      // Simulación de login exitoso → redirige al dashboard
      this.router.navigate(['/dashboard']);
    }, 800);
  }
}
