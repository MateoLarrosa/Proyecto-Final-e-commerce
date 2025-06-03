package com.api.amazonas.amazonas_e_commerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.amazonas.amazonas_e_commerce.model.Producto;
import com.api.amazonas.amazonas_e_commerce.repository.ProductoRepository;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
    
    public Producto updateProducto(Long id, Producto productoDTO) {

        Producto productoExistente = getProductoById(id);
        
        if (productoExistente != null) {
            productoExistente.setNombre(productoDTO.getNombre());
            productoExistente.setPrecio(productoDTO.getPrecio());
            productoExistente.setStock(productoDTO.getStock());
            productoExistente.setCategoria(productoDTO.getCategoria());
            productoExistente.setImagen(productoDTO.getImagen());
            productoExistente.setUserId(productoDTO.getUserId());
            return productoRepository.save(productoExistente);
        }
        return null;
    }
}
