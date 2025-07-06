package com.api.amazonas.amazonas_e_commerce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;

import com.api.amazonas.amazonas_e_commerce.model.Producto;
import com.api.amazonas.amazonas_e_commerce.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Endpoint público para el Home
    @GetMapping
    public List<Map<String, Object>> getAllProductos() {
        return productoService.getAllProductos().stream()
                .map(this::convertToFrontendFormat)
                .collect(Collectors.toList());
    }

    // Endpoint protegido para gestión de productos
     @GetMapping("/gestion")
    public List<Map<String, Object>> getProductosGestion(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("[DEBUG] No autenticado");
            return List.of();
        }

        String email = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
            .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMINISTRADOR"));
        
        System.out.println("[DEBUG] Email: " + email + ", isAdmin: " + isAdmin);
        
        List<Producto> productos;

        if (isAdmin) {
            // Para el ADMIN, se obtienen todos los productos. Esto es correcto.
            productos = productoService.getAllProductos();
        } else {
            // --- OBTENER PRODUCTOS DEL CLIENTE AUTENTICADO ---
            var usuario = productoService.obtenerUsuarioPorEmail(email);
            if (usuario == null) {
                System.out.println("[DEBUG] Usuario no encontrado para email: " + email);
                productos = List.of();
            } else {
                System.out.println("[DEBUG] Buscando productos para Usuario ID: " + usuario.getId());
                productos = productoService.getProductosByUsuario(usuario);
                System.out.println("[DEBUG] Productos encontrados para usuario " + usuario.getId() + ":");
                for (Producto p : productos) {
                    System.out.println("[DEBUG] Producto: " + p.getId() + ", userId: " + p.getUserId() + ", nombre: " + p.getNombre());
                }
            }
        }

        System.out.println("[DEBUG] Productos devueltos: " + productos.size());

        return productos.stream()
                .map(this::convertToFrontendFormat)
                .collect(Collectors.toList());
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
    public ResponseEntity<?> addProducto(@RequestBody Map<String, Object> frontendProducto) {
        try {
            Producto producto = convertToBackendFormat(frontendProducto);
            Producto saved = productoService.saveProducto(producto);
            return ResponseEntity.ok(convertToFrontendFormat(saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Error al guardar producto: " + e.getMessage()));
        }
    }

    @PostMapping("/gestion")
    public ResponseEntity<?> addProductoGestion(@RequestBody Map<String, Object> frontendProducto) {
        try {
            // Log de datos recibidos
            System.out.println("Datos recibidos: " + frontendProducto);

            Producto producto = convertToBackendFormat(frontendProducto);

            // Log después de la conversión
            System.out.println("Producto convertido: " + producto);

            Producto saved = productoService.saveProducto(producto);

            // Log después de guardar el producto
            System.out.println("Producto guardado: " + saved);

            return ResponseEntity.ok(convertToFrontendFormat(saved));
        } catch (Exception e) {
            // Log de la excepción
            System.err.println("Error al guardar producto: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Error al guardar producto: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProducto(@PathVariable String id, @RequestBody Map<String, Object> frontendProducto) {
        try {
            Producto producto = convertToBackendFormat(frontendProducto);
            Producto updated = productoService.updateProducto(id, producto);
            return ResponseEntity.ok(convertToFrontendFormat(updated));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable String id) {
        try {
            productoService.deleteProducto(id);
            return ResponseEntity.noContent().build(); // Devuelve 204 No Content, estándar para DELETE exitoso
        } catch (AccessDeniedException e) {
            // Si el servicio negó el acceso, devolvemos 403 Forbidden
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/descontar-stock")
    public ResponseEntity<?> descontarStockMultiple(@RequestBody List<Producto> productos) {
        boolean exito = productoService.descontarStockMultiple(productos);
        if (exito) {
            return ResponseEntity.ok().body("Stock actualizado correctamente");
        } else {
            return ResponseEntity.badRequest().body("Error: producto no encontrado o stock insuficiente");
        }
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
        frontendFormat.put("description", producto.getNombre()); // Se usa el nombre como descripción por defecto
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
