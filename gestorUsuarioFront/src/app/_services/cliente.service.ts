import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string = `${environment.HOST}/clientes`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

}
