package com.jaimetorres.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jaimetorres.model.Gestion;
import com.jaimetorres.model.TipoDocumento;
import com.jaimetorres.repo.ITipoDocumentoRepo;
import com.jaimetorres.repo.IGenericRepo;
import com.jaimetorres.service.ITipoDocumentoService;

@Service
public class TipoDocumentoServiceImpl extends CRUDImpl<TipoDocumento, Integer> implements ITipoDocumentoService {

	@Autowired
	private ITipoDocumentoRepo repo;
	
	@Override
	protected IGenericRepo<TipoDocumento, Integer> getRepo(){
		return repo;
	}
	
//	@Override
//	public TipoDocumento registrar(TipoDocumento cli) throws Exception {
//		return repo.save(cli);
//	}
//
//	@Override
//	public TipoDocumento modificar(TipoDocumento cli) throws Exception {
//		return repo.save(cli);
//	}
//
//	@Override
//	public List<TipoDocumento> listar() throws Exception {
//		return repo.findAll();
//	}
//
//	@Override
//	public TipoDocumento listarPorId(Integer id) throws Exception {
//		//Opotional java 8 para capturar los null point exception
//		Optional<TipoDocumento> op = repo.findById(id);
//		return op.isPresent() ? op.get() : new TipoDocumento();
//	}
//
//	@Override
//	public void eliminar(Integer id) throws Exception {
//		repo.deleteById(id);
//		
//	}
	



		
}


