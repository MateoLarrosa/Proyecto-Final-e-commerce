package com.api.amazonas.amazonas_e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.api.amazonas.amazonas_e_commerce.model.Producto;
import com.api.amazonas.amazonas_e_commerce.service.ProductoService;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/productos") //localhost:8080/api/productos
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable String id) {
        return productoService.getProductoById(id);
    }
    
    @PostMapping
    public Producto addProducto(@RequestBody Producto producto) {
        return productoService.saveProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable String id, @RequestBody Producto productoDTO) {
        return productoService.updateProducto(id, productoDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable String id) {
        productoService.deleteProducto(id);
    }
}
