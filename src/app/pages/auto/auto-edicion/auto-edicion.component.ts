import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Auto } from 'src/app/_modelo/auto';
import { AutoService } from 'src/app/_servicio/auto.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-edicion',
  templateUrl: './auto-edicion.component.html',
  styleUrls: ['./auto-edicion.component.css'],
})
export class AutoEdicionComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  edicion: boolean = false;
  constructor(
    public router: ActivatedRoute,
    private autoServicio: AutoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(0),
      placa: new FormControl(''),
      color: new FormControl(''),
      modelo: new FormControl(''),
      chasis: new FormControl(''),
    });
    this.router.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.autoServicio.listarPorId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idAuto),
          placa: new FormControl(data.placa),
          color: new FormControl(data.color),
          modelo: new FormControl(data.modelo),
          chasis: new FormControl(data.chasis),
        });
      });
    }
  }

  operar() {
    let auto = new Auto();
    auto.idAuto = this.form.value['id'];
    auto.placa = this.form.value['placa'];
    auto.color = this.form.value['color'];
    auto.modelo = this.form.value['modelo'];
    auto.chasis = this.form.value['chasis'];

    if (this.edicion) {
      this.autoServicio.modificar(auto).subscribe(() => {
        this.autoServicio.listar().subscribe((data) => {
          this.autoServicio.setAutoCambio(data);
          this.autoServicio.setMensajeCambio('Se modificó');
        });
      });
    } else {
      this.autoServicio
        .registrar(auto)
        .pipe(
          switchMap(() => {
            return this.autoServicio.listar();
          })
        )
        .subscribe((data) => {
          this.autoServicio.setAutoCambio(data);
          this.autoServicio.setMensajeCambio('Se registro');
        });
    }
    this.route.navigate(['/auto']);
  }

}
