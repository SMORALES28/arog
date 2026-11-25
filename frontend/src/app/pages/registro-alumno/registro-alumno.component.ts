// src/app/pages/registro-alumno/registro-alumno.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Grupo {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registro-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent {
  // Modelo del formulario
  alumno = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    matricula: '',
    grupoId: null as number | null
  };

  // Catálogo de grupos (temporal, luego vendrá del backend)
  grupos: Grupo[] = [
    { id: 1, nombre: '1° A' },
    { id: 2, nombre: '1° B' },
    { id: 3, nombre: '2° A' },
    { id: 4, nombre: '2° B' },
    { id: 5, nombre: '3° A' }
  ];

  cargando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  onSubmit(form: any): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    // Validaciones
    if (!this.alumno.nombre.trim()) {
      this.errorMensaje = 'El nombre es obligatorio.';
      return;
    }
    if (!this.alumno.apellidoPaterno.trim()) {
      this.errorMensaje = 'El apellido paterno es obligatorio.';
      return;
    }
    if (!this.alumno.correo.includes('@')) {
      this.errorMensaje = 'Ingresa un correo válido.';
      return;
    }
    if (!this.alumno.matricula.trim()) {
      this.errorMensaje = 'La matrícula es obligatoria.';
      return;
    }
    if (!this.alumno.grupoId) {
      this.errorMensaje = 'Selecciona un grupo escolar.';
      return;
    }

    this.cargando = true;

    // TODO: reemplazar por AlumnoService.crear(this.alumno)
    setTimeout(() => {
      this.cargando = false;
      this.exitoMensaje = `Alumno ${this.alumno.nombre} ${this.alumno.apellidoPaterno} registrado correctamente.`;
      this.limpiarFormulario(form);
    }, 800);
  }

  limpiarFormulario(form: any): void {
    form.resetForm();
    this.alumno = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      matricula: '',
      grupoId: null
    };
  }
}
