import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/app/_modelo/consulta';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultaService } from 'src/app/_servicio/consulta.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaDialogComponent } from './consulta-dialog/consulta-dialog.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();
  form!: FormGroup;
  placa: string = '';
  consulta!: Consulta;
  constructor(
    private consultaServicio: ConsultaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      placa: new FormControl(''),
      fecha: new FormControl(new Date()),
    });
  }
  consultar() {
    let validarpp = new Consulta();
    validarpp.placa = this.form.value['placa'];
    validarpp.fecha = moment(this.form.value['fecha']).format(
      'YYYY-MM-DDTHH:mm:ss'
    );
    validarpp.mensaje = '';
    validarpp.existeAuto = '0';
    this.consultaServicio
      .consultarCirculacion(validarpp)
      .subscribe((data: any) => {
        this.consulta = data;
        this.consultaServicio.setEstadoAutoCambio(this.consulta.existeAuto);
        this.abrirDialogo();
      });
  }

  abrirDialogo() {
    this.dialog.open(ConsultaDialogComponent, {
      height: '220px',
      width: '350px',
      data: this.consulta,
    });
  }
}
