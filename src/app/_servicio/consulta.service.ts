import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_modelo/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url: string = `${environment.HOST}/consultas`;
  private estadoAuto: Subject <string> = new Subject<string>();
  constructor( private http: HttpClient) {
  }

  consultarCirculacion(consulta: Consulta) {
    return this.http.post(this.url, consulta);
  }

  getEstadoAutoCambio() {
    return this.estadoAuto.asObservable();
  }

  setEstadoAutoCambio(msj: string) {
    this.estadoAuto.next(msj);
  }
}
