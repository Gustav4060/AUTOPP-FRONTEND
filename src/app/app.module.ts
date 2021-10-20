import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoComponent } from './pages/auto/auto.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoEdicionComponent } from './pages/auto/auto-edicion/auto-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogComponent } from './pages/auto/confirm-dialog/confirm-dialog.component';
import { ConsultaDialogComponent } from './pages/consulta/consulta-dialog/consulta-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AutoComponent,
    ConsultaComponent,
    PageNotFoundComponent,
    AutoEdicionComponent,
    ConfirmDialogComponent,
    ConsultaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
