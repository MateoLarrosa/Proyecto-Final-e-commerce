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

    public Producto getProductoById(String id) {
        return productoRepository.findById(id).orElse(null);
    }

    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public void deleteProducto(String id) {
        productoRepository.deleteById(id);
    }
    
    public Producto updateProducto(String id, Producto productoDTO) {

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

    /**
     * Descuenta stock de varios productos en una sola operación.
     * @param productos Lista de productos con id y cantidad a descontar
     * @return true si todo fue exitoso, false si algún producto no existe o stock insuficiente
     */
    public boolean descontarStockMultiple(List<Producto> productos) {
        for (Producto p : productos) {
            Producto productoBD = getProductoById(p.getId());
            if (productoBD == null) return false;
            int nuevoStock = productoBD.getStock() - p.getStock(); // p.getStock() es la cantidad a descontar
            if (nuevoStock < 0) return false;
            productoBD.setStock(nuevoStock);
            productoRepository.save(productoBD);
        }
        return true;
    }
}
