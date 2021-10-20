import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoEdicionComponent } from './pages/auto/auto-edicion/auto-edicion.component';
import { AutoComponent } from './pages/auto/auto.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auto',
    component: AutoComponent,
    children: [
      { path: 'nuevo', component: AutoEdicionComponent },
      {
        path: 'edicion/:id',
        component: AutoEdicionComponent,
      },
    ],
  },
  { path: 'consulta', component: ConsultaComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
