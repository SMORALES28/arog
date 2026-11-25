import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { RegistroAlumnoComponent } from './pages/registro-alumno/registro-alumno.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetalleGrupoComponent } from './pages/detalle-grupo/detalle-grupo.component';
import { DetalleAlumnoComponent } from './pages/detalle-alumno/detalle-alumno.component';
import { GenerarQrComponent } from './pages/generar-qr/generar-qr.component';
import { EscanearQrComponent } from './pages/escanear-qr/escanear-qr.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'registro-alumno', component: RegistroAlumnoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'grupo/:id', component: DetalleGrupoComponent },
  { path: 'alumno/:id', component: DetalleAlumnoComponent },
  { path: 'generar-qr', component: GenerarQrComponent },
  { path: 'escanear-qr', component: EscanearQrComponent },
  // Aquí irán las demás pantallas más adelante
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
