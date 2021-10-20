import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Auto } from 'src/app/_modelo/auto';
import { AutoService } from 'src/app/_servicio/auto.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css'],
})
export class AutoComponent implements OnInit {
  displayedColumns: string[] = [
    'idAuto',
    'placa',
    'color',
    'modelo',
    'chasis',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Auto>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private autoServicio: AutoService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.autoServicio.listar().subscribe((data) => {
      this.crearTabla(data);
    });

    this.autoServicio.getAutoCambio().subscribe((data) => {
      this.crearTabla(data);
    });

    this.autoServicio.getMensajeCambio().subscribe((data) => {
      this.snackbar.open(data, 'AVISO', {
        duration: 2000,
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Auto[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  verificarHijos() {
    return this.route.children.length !== 0;
  }
  abrirDialogo(auto?: Auto) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '280px',
      data: auto,
    });
  }
}
