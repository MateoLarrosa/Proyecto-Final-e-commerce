package com.api.amazonas.amazonas_e_commerce.service;

import com.api.amazonas.amazonas_e_commerce.model.Producto;
import com.api.amazonas.amazonas_e_commerce.model.Usuario;
import com.api.amazonas.amazonas_e_commerce.repository.ProductoRepository;
import com.api.amazonas.amazonas_e_commerce.repository.UsuarioRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import java.util.List;

@Service
@Transactional
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public ProductoService(ProductoRepository productoRepository, UsuarioRepository usuarioRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(String id) {
        return productoRepository.findById(id).orElse(null);
    }

    // Método para obtener el usuario autenticado actual
    private Usuario getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return usuarioRepository.findByEmail(userEmail)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    // Al guardar, nos aseguramos de asignar el ID del usuario correcto
    public Producto saveProducto(Producto producto) {
        Usuario usuarioActual = getAuthenticatedUser();
        producto.setUserId(usuarioActual.getId()); // Asignar el ID del usuario autenticado
        return productoRepository.save(producto);
    }

    public void deleteProducto(String id) {
        // 1. Obtener el usuario autenticado
        Usuario usuarioActual = getAuthenticatedUser();
        
        // 2. Obtener el producto que se quiere borrar
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        // 3. Verificar permisos: El usuario es ADMIN o es el dueño del producto
        boolean esAdmin = usuarioActual.getRole().equals("ADMIN");
        boolean esDueño = producto.getUserId().equals(usuarioActual.getId());

        if (esAdmin || esDueño) {
            productoRepository.deleteById(id);
        } else {
            // 4. Si no tiene permisos, lanzar una excepción de acceso denegado
            throw new AccessDeniedException("No tiene permisos para eliminar este producto");
        }
    }

     public Producto updateProducto(String id, Producto productoDTO) {
        // 1. Obtener el usuario autenticado
        Usuario usuarioActual = getAuthenticatedUser();
        
        // 2. Obtener el producto existente
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        // 3. Verificar permisos: El usuario es ADMIN o es el dueño del producto
        boolean esAdmin = usuarioActual.getRole().equals("ADMIN");
        boolean esDueño = productoExistente.getUserId().equals(usuarioActual.getId());

        if (esAdmin || esDueño) {
            productoExistente.setNombre(productoDTO.getNombre());
            productoExistente.setPrecio(productoDTO.getPrecio());
            productoExistente.setStock(productoDTO.getStock());
            productoExistente.setCategoria(productoDTO.getCategoria());
            productoExistente.setImagen(productoDTO.getImagen());
            // Nos aseguramos que el dueño no cambie accidentalmente
            productoExistente.setUserId(productoExistente.getUserId()); 
            return productoRepository.save(productoExistente);
        } else {
            // 4. Si no tiene permisos, lanzar una excepción
            throw new AccessDeniedException("No tiene permisos para actualizar este producto");
        }
    }

    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));
    }

    public List<Producto> getProductosByUsuario(Usuario usuario) {
        return productoRepository.findByUserId(usuario.getId());
    }

    public boolean descontarStockMultiple(List<Producto> productos) {
        for (Producto p : productos) {
            Producto productoBD = getProductoById(p.getId());
            if (productoBD == null) return false;
            int nuevoStock = productoBD.getStock() - p.getStock();
            if (nuevoStock < 0) return false;
            productoBD.setStock(nuevoStock);
            productoRepository.save(productoBD);
        }
        return true;
    }
}
