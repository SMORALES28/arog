// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Grupo {
  id: number;
  nombre: string;
  totalAlumnos: number;
  turno: 'Matutino' | 'Vespertino';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Catálogo temporal (luego vendrá de GrupoService.listar())
  grupos: Grupo[] = [];
  cargando: boolean = true;

  ngOnInit(): void {
    // TODO: reemplazar por GrupoService.listar().subscribe(...)
    setTimeout(() => {
      this.grupos = [
        { id: 1, nombre: '1° A', totalAlumnos: 28, turno: 'Matutino' },
        { id: 2, nombre: '1° B', totalAlumnos: 30, turno: 'Matutino' },
        { id: 3, nombre: '2° A', totalAlumnos: 25, turno: 'Matutino' },
        { id: 4, nombre: '2° B', totalAlumnos: 27, turno: 'Vespertino' },
        { id: 5, nombre: '3° A', totalAlumnos: 22, turno: 'Vespertino' },
        { id: 6, nombre: '3° B', totalAlumnos: 24, turno: 'Vespertino' }
      ];
      this.cargando = false;
    }, 600);
  }
}
