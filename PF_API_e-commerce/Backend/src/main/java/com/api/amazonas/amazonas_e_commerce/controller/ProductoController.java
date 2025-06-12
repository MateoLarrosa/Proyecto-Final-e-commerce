package com.api.amazonas.amazonas_e_commerce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import com.api.amazonas.amazonas_e_commerce.model.Producto;
import com.api.amazonas.amazonas_e_commerce.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Map<String, Object>> getAllProductos() {
        List<Producto> productos = productoService.getAllProductos();
        return productos.stream().map(this::convertToFrontendFormat).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getProductoById(@PathVariable String id) {
        Producto producto = productoService.getProductoById(id);
        if (producto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
        return convertToFrontendFormat(producto);
    }
    
    @PostMapping
    public Map<String, Object> addProducto(@RequestBody Map<String, Object> frontendProducto) {
        Producto producto = convertToBackendFormat(frontendProducto);
        Producto saved = productoService.saveProducto(producto);
        return convertToFrontendFormat(saved);
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateProducto(@PathVariable String id, @RequestBody Map<String, Object> frontendProducto) {
        Producto producto = convertToBackendFormat(frontendProducto);
        producto.setId(id);
        Producto updated = productoService.updateProducto(id, producto);
        if (updated == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
        return convertToFrontendFormat(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable String id) {
        productoService.deleteProducto(id);
    }

    private Map<String, Object> convertToFrontendFormat(Producto producto) {
        Map<String, Object> frontendFormat = new HashMap<>();
        frontendFormat.put("id", producto.getId());
        frontendFormat.put("title", producto.getNombre());
        frontendFormat.put("price", producto.getPrecio());
        frontendFormat.put("stock", producto.getStock());
        frontendFormat.put("category", producto.getCategoria());
        frontendFormat.put("image", producto.getImagen());
        frontendFormat.put("userId", producto.getUserId());
        frontendFormat.put("description", producto.getNombre()); // Usando nombre como descripción por defecto
        return frontendFormat;
    }

    private Producto convertToBackendFormat(Map<String, Object> frontendProducto) {
        Producto producto = new Producto();
        if (frontendProducto.get("id") != null) {
            producto.setId(frontendProducto.get("id").toString());
        }
        producto.setNombre(frontendProducto.get("title") != null ? 
            frontendProducto.get("title").toString() : 
            frontendProducto.get("nombre").toString());
        producto.setPrecio(parseNumber(frontendProducto.get("price"), frontendProducto.get("precio")));
        producto.setStock(parseNumber(frontendProducto.get("stock"), frontendProducto.get("stock")));
        producto.setCategoria(frontendProducto.get("category") != null ? 
            frontendProducto.get("category").toString() : 
            frontendProducto.get("categoria").toString());
        producto.setImagen(frontendProducto.get("image") != null ? 
            frontendProducto.get("image").toString() : 
            frontendProducto.get("imagen").toString());
        producto.setUserId(frontendProducto.get("userId") != null ? 
            frontendProducto.get("userId").toString() : null);
        return producto;
    }

    private int parseNumber(Object frontendValue, Object backendValue) {
        if (frontendValue != null) {
            if (frontendValue instanceof Number) {
                return ((Number) frontendValue).intValue();
            }
            try {
                return Integer.parseInt(frontendValue.toString());
            } catch (NumberFormatException e) {
                // Intentar parsear como double y convertir a int
                return (int) Double.parseDouble(frontendValue.toString());
            }
        }
        if (backendValue != null) {
            if (backendValue instanceof Number) {
                return ((Number) backendValue).intValue();
            }
            return Integer.parseInt(backendValue.toString());
        }
        return 0;
    }
}
