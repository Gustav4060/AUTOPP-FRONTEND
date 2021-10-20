import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auto } from '../_modelo/auto';
import { GenericoService } from './generico.service';

@Injectable({
  providedIn: 'root',
})
export class AutoService extends GenericoService<Auto>{
  private autoSubject: Subject<Auto[]> = new Subject<Auto[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/autos`);
  }

  getAutoCambio() {
    return this.autoSubject.asObservable();
  }

  setAutoCambio(autos: Auto[]) {
    this.autoSubject.next(autos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string) {
    this.mensajeCambio.next(msj);
  }
}
