import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Consulta } from 'src/app/_modelo/consulta';
import { ConsultaService } from 'src/app/_servicio/consulta.service';

@Component({
  selector: 'app-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  styleUrls: ['./consulta-dialog.component.css'],
})
export class ConsultaDialogComponent implements OnInit {
  consulta!: Consulta;
  registroAuto: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.consulta = { ...this.data };
  }
  cerrar() {
    this.dialogRef.close();
  }
  registrarNuevoAuto(){
    this.route.navigate(['/auto/nuevo']);
    this.cerrar();
  }
}
