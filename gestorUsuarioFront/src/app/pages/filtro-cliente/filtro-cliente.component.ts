import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';


@Component({
  selector: 'app-filtro-cliente',
  templateUrl: './filtro-cliente.component.html',
  styleUrls: ['./filtro-cliente.component.css']
})



export class FiltroClienteComponent implements OnInit{

  displayedColumns: string[] = ['razonSocial','tipoDocumento.tipoDoc','nroDocumento','divipola.nombre',
  'divipola.divipolaPadre.nombre','direccion','telefonoCelular','telefonoFijo','acciones'];
  dataSource !: MatTableDataSource<Cliente>;

  detalleGestionColumns: string[] = ['idDetalleGestion'];
  dataSourceDG !: MatTableDataSource<Cliente>;

  tipoDocumento !: string;
  nroDocumento  !: string;
  idCliente  : number = 252652;
  panelOpenState = false;
  parametros !: Parametros;

  constructor( private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private snackBar: MatSnackBar) { }



  form!: FormGroup;
  form2!: FormGroup;
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

    this.form2 = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telefonop': new FormControl(''),
      'telefonos': new FormControl('')

    });
  }

  
buscar(){
 this.clienteSelec();
 this.detalleHistorico();

}
  

  clienteSelec(){
    console.log('tipo',this.tipoDocumento);
    console.log('doc',this.nroDocumento);
    const parametros= {tipoDoc:this.tipoDocumento, nroDoc:this.nroDocumento}
    
    this.clienteService.filtroCliente(parametros).subscribe( data =>{
       // console.log(data)
        this.dataSource= new MatTableDataSource(data);
       // console.log('tipo2',data.idCliente);
    });

    

  }

  detalleHistorico(){

    const parametros= {nroCliente:252652}
    
    this.detalleGestionService.detalleHistorico(parametros).subscribe( data =>{
        console.log('detalle: ',data)
        this.dataSourceDG= new MatTableDataSource(data);
    });
  }

}
