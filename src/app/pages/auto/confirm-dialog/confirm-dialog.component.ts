import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auto } from 'src/app/_modelo/auto';
import { AutoService } from 'src/app/_servicio/auto.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  auto!: Auto;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Auto,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private autoServicio: AutoService
  ) {}

  ngOnInit(): void {
    this.auto = { ...this.data };
  }
  cerrar() {
    this.dialogRef.close();
  }

  eliminar() {
    console.log(this.auto.idAuto);
    this.autoServicio
      .eliminar(this.auto.idAuto!)
      .pipe(
        switchMap(() => {
          return this.autoServicio.listar();
        })
      )
      .subscribe((data) => {
        this.autoServicio.setAutoCambio(data);
      });
    this.cerrar();
  }
}
