import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../_model/tipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private url:string = `${environment.HOST}/tipoDocumentos`;

  constructor (
    private http: HttpClient,
    private router: Router ) { }

    buscar(){
      return this.http.get<TipoDocumento[]>(`${this.url}`);
    }
}
