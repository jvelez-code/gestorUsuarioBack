import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
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

  detalleGestionColumns: string[] = ['idGestion'];
  dataSourceDG !: MatTableDataSource<Cliente>;

  tipoDocumento !: string;
  nroDocumento  !: string;
  idEmpresa !: number;
  idTipoCampana !: number;
  idCliente   !: string;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  parametros !: Parametros;
  tipoGestionP !: number;
  tipoGestionH !: number;

  constructor( private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService ,
    private estadoGestionService :EstadoGestionService,
    private snackBar: MatSnackBar) { }



  form!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;
  id!: number;
  edicion!: boolean;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoGestion$ !: Observable<EstadoGestion[]>;
  subTipoGestion$ !: Observable<EstadoGestion[]>;


  ngOnInit(): void {

    this.tipoDocumento$=this.TipoDocumentoService.buscar();

     this.TipoDocumentoService.buscar().subscribe(data=>{
      console.log('documentos',data)
    });;

    

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

    this.form3 = new FormGroup({
      'id': new FormControl(0),
      'razonSocial': new FormControl(''),

    });

  }

  
buscar(){
 this.clienteSelec();
 this.gestionHistorico();

}
  

  clienteSelec(){
    console.log('tipo',this.tipoDocumento);
    console.log('doc',this.nroDocumento);
    this.tipoGestionP = 0
    this.tipoGestionH = 0
    const parametros= {tipoDoc:this.tipoDocumento, nroDoc:this.nroDocumento}
    
    this.clienteService.filtroCliente(parametros).subscribe( data =>{
       //console.log(data)
        this.dataSource= new MatTableDataSource(data);
       // console.log('tipo2',data.idCliente);
    });

    

  }

  gestionHistorico(){

    console.log('tipo',this.tipoDocumento);
    console.log('doc',this.nroDocumento);
    this.idEmpresa= 1;
    this.idTipoCampana= 3;
    //this.tipoGestionP= 283755

    const parametros= { nroCliente:this.nroDocumento, idEmpresa:this.idEmpresa, 
                        idTipoCampana:this.idTipoCampana, idEstadoPadre:this.tipoGestionP }
    
    this.gestionService.gestionHistorico(parametros).subscribe( data =>{
        console.log(data)
        this.dataSourceDG= new MatTableDataSource(data);
       // console.log('tipo2',data.idCliente);
    });


   this.tipoGestion$=this.estadoGestionService.estadoGestionPadre(parametros);
   
   

    this.estadoGestionService.estadoGestionPadre(parametros).subscribe(data => {
      console.log('EstadoGestion');
      console.log(data);
    });

  }

  subtipoGestion(tipoGestionP:number){

    console.log(tipoGestionP)

    const parametros= {  idEstadoPadre:this.tipoGestionP , idTipoCampana:this.idTipoCampana, }


    this.subTipoGestion$=this.estadoGestionService.estadoGestionHijo(parametros);
  }


 


}
