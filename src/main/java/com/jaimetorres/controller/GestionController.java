package com.jaimetorres.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jaimetorres.dto.FiltroEntranteDTO;
import com.jaimetorres.exception.ModeloNotFoundException;
import com.jaimetorres.model.Gestion;
import com.jaimetorres.service.IGestionService;

@RestController
@RequestMapping("/gestiones")
public class GestionController {


	@Autowired
	private IGestionService service;
	
	//ResponseEntity Para capturar excepciones
	@GetMapping
	public ResponseEntity<List<Gestion>> listar() throws Exception{
		List<Gestion> lista=service.listar();
		return new ResponseEntity<List<Gestion>>(lista, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public Gestion listarPorId(@PathVariable("id") Integer id) throws Exception{
		return service.listarPorId(id);
	}
	
//	@GetMapping("/hateoas/{id}")
//	public EntityModel<Gestion> listarPorIdHateoas(@PathVariable("id") Integer id) throws Exception{
//		Gestion obj=service.listarPorId(id);
//		
//		if(obj==null) {
//			throw new ModeloNotFoundException("ID NO ENCONTRADO: " +id);
//		}
//		
//		
//		
//		//localhost:8080/Gestion/{id}
//		EntityModel<Gestion> recurso=EntityModel.of(obj);
//		WebMvcLinkBuilder linkTo= linkTo(methodOn(this.getClass()).listarPorId(id));
//		
//		//return new ResponseEntity<Gestion>(obj, HttpStatus.OK);
//		
//		recurso.add(linkTo.withRel("Gestion-recurso"));
//		return recurso;
//	}
	
	//@RequestBody json a objeto  java
		@PostMapping
		public ResponseEntity<Gestion> registrar(@Valid @RequestBody Gestion Gestion) throws Exception{
			Gestion obj=service.registrar(Gestion);
			
			//localhost:8080/pacientes/7
			URI location=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdGestion()).toUri();
			return new ResponseEntity<Gestion>(obj, HttpStatus.CREATED);
		}
		
		
		@PutMapping
		public ResponseEntity<Gestion> modificar(@Valid @RequestBody Gestion Gestion) throws Exception{
			Gestion obj=service.modificar(Gestion);
			return new ResponseEntity<Gestion>(obj, HttpStatus.OK);
		}
		
		
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> eliminar(@PathVariable("id") Integer id) throws Exception{
			Gestion obj=service.listarPorId(id);
			if(obj==null) {
				throw new ModeloNotFoundException("ID NO ENCONTRADO: " +id);
			}
			service.eliminar(id);		
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		
		//@RequestBody json a objeto  java
		@PostMapping("/buscar")
		public ResponseEntity<List<Gestion>> buscarA(@RequestBody FiltroEntranteDTO filtro) throws Exception{
			
			List<Gestion> Gestion = new ArrayList<>();
			Gestion = service.buscarA(filtro);
			
			System.out.print(Gestion.get(1));
			
			return new ResponseEntity<List<Gestion>>(Gestion, HttpStatus.OK);
		}
	
}
