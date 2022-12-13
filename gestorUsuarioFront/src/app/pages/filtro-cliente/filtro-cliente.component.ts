import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';


@Component({
  selector: 'app-filtro-cliente',
  templateUrl: './filtro-cliente.component.html',
  styleUrls: ['./filtro-cliente.component.css']
})



export class FiltroClienteComponent implements OnInit{

  tipoDocumento !: string;
  nroDocumento  !: string;

  constructor( private TipoDocumentoService : TipoDocumentoService,
    private snackBar: MatSnackBar) { }


  form!: FormGroup;
  id!: number;
  edicion!: boolean;
  tipoDocumento$ !: Observable<TipoDocumento[]>;


  ngOnInit(): void {

    this.tipoDocumento$=this.TipoDocumentoService.buscar();

    // this.TipoDocumentoService.buscar().subscribe(data=>{
    //   console.log(data)
    // });;


    this.form = new FormGroup({
      'id': new FormControl(0),
      'razonSocial': new FormControl(''),

    });
  }

  

  operar(){
    console.log('tipo',this.tipoDocumento);
    console.log('doc',this.nroDocumento);
  }

}
