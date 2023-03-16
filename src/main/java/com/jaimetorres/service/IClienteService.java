package com.jaimetorres.service;

import java.util.List;

import com.jaimetorres.dto.FiltroEntranteDTO;
import com.jaimetorres.model.Cliente;


public interface IClienteService extends ICRUD<Cliente , Integer >{
	
	Cliente buscar(FiltroEntranteDTO filtro);
	List<Cliente> buscarByCliente(FiltroEntranteDTO filtro);
	List<Cliente> buscarByClientes(FiltroEntranteDTO filtro);
	
}
