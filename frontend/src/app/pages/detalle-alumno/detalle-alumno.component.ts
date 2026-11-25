// src/app/pages/detalle-alumno/detalle-alumno.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Alumno {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  correo: string;
  grupo: string;
}

interface DiaCalendario {
  fecha: Date | null;        // null para celdas vacías de la primera/última semana
  dia: number | null;
  asistio: boolean;
  esHoy: boolean;
  esFinDeSemana: boolean;
}

@Component({
  selector: 'app-detalle-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})
export class DetalleAlumnoComponent implements OnInit {

  alumno: Alumno | null = null;
  cargando: boolean = true;

  // Mes actualmente visualizado
  mesActual: Date = new Date();

  // Días del calendario generados
  diasCalendario: DiaCalendario[] = [];

  // Set de fechas en las que el alumno asistió (clave: 'YYYY-MM-DD')
  asistencias: Set<string> = new Set();

  // Nombres de meses en español
  readonly meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  readonly diasSemana = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.cargarDatos(id);
    });
  }

  cargarDatos(id: number): void {
    this.cargando = true;

    // TODO: reemplazar por AlumnoService.obtener(id) y AsistenciaService.porAlumnoYMes(id, ...)
    setTimeout(() => {
      this.alumno = {
        id,
        nombre: 'Ana Sofía',
        apellidoPaterno: 'García',
        apellidoMaterno: 'Ramírez',
        matricula: '2024001',
        correo: 'ana.garcia@escuela.edu.mx',
        grupo: '1° A'
      };

      // Simulamos asistencias: días hábiles del mes actual menos algunos
      this.asistencias = this.generarAsistenciasSimuladas(this.mesActual);
      this.construirCalendario();
      this.cargando = false;
    }, 500);
  }

  generarAsistenciasSimuladas(mes: Date): Set<string> {
    const set = new Set<string>();
    const year = mes.getFullYear();
    const month = mes.getMonth();
    const ultimoDia = new Date(year, month + 1, 0).getDate();

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const fecha = new Date(year, month, dia);
      const dow = fecha.getDay(); // 0 = domingo, 6 = sábado
      // Simula asistencia en días hábiles excepto algunos (día % 7 === 3)
      if (dow !== 0 && dow !== 6 && dia % 7 !== 3) {
        set.add(this.claveFecha(fecha));
      }
    }
    return set;
  }

  claveFecha(fecha: Date): string {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  construirCalendario(): void {
    const year = this.mesActual.getFullYear();
    const month = this.mesActual.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0).getDate();
    const hoy = new Date();
    const hoyClave = this.claveFecha(hoy);

    // getDay(): 0 = domingo. Ajustamos para que la semana empiece en lunes
    const offsetInicial = (primerDia.getDay() + 6) % 7;

    const dias: DiaCalendario[] = [];

    // Celdas vacías iniciales
    for (let i = 0; i < offsetInicial; i++) {
      dias.push({ fecha: null, dia: null, asistio: false, esHoy: false, esFinDeSemana: false });
    }

    // Días reales
    for (let d = 1; d <= ultimoDia; d++) {
      const fecha = new Date(year, month, d);
      const dow = fecha.getDay();
      const clave = this.claveFecha(fecha);
      dias.push({
        fecha,
        dia: d,
        asistio: this.asistencias.has(clave),
        esHoy: clave === hoyClave,
        esFinDeSemana: dow === 0 || dow === 6
      });
    }

    this.diasCalendario = dias;
  }

  mesAnterior(): void {
    this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth() - 1, 1);
    this.asistencias = this.generarAsistenciasSimuladas(this.mesActual);
    this.construirCalendario();
  }

  mesSiguiente(): void {
    this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth() + 1, 1);
    this.asistencias = this.generarAsistenciasSimuladas(this.mesActual);
    this.construirCalendario();
  }

  get tituloMes(): string {
    return `${this.meses[this.mesActual.getMonth()]} ${this.mesActual.getFullYear()}`;
  }

  get totalAsistencias(): number {
    return Array.from(this.asistencias).length;
  }

  get totalDiasHabiles(): number {
    const year = this.mesActual.getFullYear();
    const month = this.mesActual.getMonth();
    const ultimoDia = new Date(year, month + 1, 0).getDate();
    let habiles = 0;
    for (let d = 1; d <= ultimoDia; d++) {
      const dow = new Date(year, month, d).getDay();
      if (dow !== 0 && dow !== 6) habiles++;
    }
    return habiles;
  }

  get totalFaltas(): number {
    return Math.max(this.totalDiasHabiles - this.totalAsistencias, 0);
  }

  get porcentaje(): number {
    if (this.totalDiasHabiles === 0) return 0;
    return Math.round((this.totalAsistencias / this.totalDiasHabiles) * 100);
  }
}
