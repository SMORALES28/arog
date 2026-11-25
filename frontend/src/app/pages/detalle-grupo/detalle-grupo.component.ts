// src/app/pages/detalle-grupo/detalle-grupo.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Alumno {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  correo: string;
  asistenciasMes: number;
}

@Component({
  selector: 'app-detalle-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalle-grupo.component.html',
  styleUrls: ['./detalle-grupo.component.css']
})
export class DetalleGrupoComponent implements OnInit {

  grupoId: number | null = null;
  grupoNombre: string = '';
  grupoTurno: string = '';

  alumnos: Alumno[] = [];
  cargando: boolean = true;
  filtro: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.grupoId = idParam ? Number(idParam) : null;
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.cargando = true;

    // TODO: reemplazar por GrupoService.obtener(this.grupoId) y AlumnoService.porGrupo(this.grupoId)
    setTimeout(() => {
      this.grupoNombre = this.grupoId === 1 ? '1° A' :
        this.grupoId === 2 ? '1° B' :
          this.grupoId === 3 ? '2° A' :
            this.grupoId === 4 ? '2° B' :
              this.grupoId === 5 ? '3° A' : '3° B';
      this.grupoTurno = (this.grupoId ?? 0) >= 4 ? 'Vespertino' : 'Matutino';

      this.alumnos = [
        { id: 101, nombre: 'Ana Sofía',   apellidoPaterno: 'García',   apellidoMaterno: 'Ramírez', matricula: '2024001', correo: 'ana.garcia@escuela.edu.mx',   asistenciasMes: 20 },
        { id: 102, nombre: 'Luis Ángel',  apellidoPaterno: 'Martínez', apellidoMaterno: 'Hernández', matricula: '2024002', correo: 'luis.martinez@escuela.edu.mx', asistenciasMes: 18 },
        { id: 103, nombre: 'María José',  apellidoPaterno: 'López',    apellidoMaterno: 'Sánchez',  matricula: '2024003', correo: 'maria.lopez@escuela.edu.mx',   asistenciasMes: 22 },
        { id: 104, nombre: 'Diego',       apellidoPaterno: 'Flores',   apellidoMaterno: 'Torres',   matricula: '2024004', correo: 'diego.flores@escuela.edu.mx',  asistenciasMes: 15 },
        { id: 105, nombre: 'Valeria',     apellidoPaterno: 'Cruz',     apellidoMaterno: 'Morales',  matricula: '2024005', correo: 'valeria.cruz@escuela.edu.mx',  asistenciasMes: 21 },
        { id: 106, nombre: 'Emiliano',    apellidoPaterno: 'Rojas',    apellidoMaterno: 'Jiménez',  matricula: '2024006', correo: 'emiliano.rojas@escuela.edu.mx', asistenciasMes: 19 }
      ];
      this.cargando = false;
    }, 500);
  }

  // Filtro simple sobre nombre, apellidos o matrícula
  get alumnosFiltrados(): Alumno[] {
    const q = this.filtro.trim().toLowerCase();
    if (!q) return this.alumnos;
    return this.alumnos.filter(a =>
      `${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno}`.toLowerCase().includes(q) ||
      a.matricula.toLowerCase().includes(q)
    );
  }
}
