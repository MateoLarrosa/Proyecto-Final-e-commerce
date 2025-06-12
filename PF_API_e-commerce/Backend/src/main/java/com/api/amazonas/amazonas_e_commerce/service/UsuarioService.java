package com.api.amazonas.amazonas_e_commerce.service;

import com.api.amazonas.amazonas_e_commerce.model.Usuario;
import com.api.amazonas.amazonas_e_commerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear nuevo usuario
    public Usuario crearUsuario(Usuario usuario) {
        // Validar que el email no esté registrado (como lo hace el frontend)
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado.");
        }
        
        // Si no se especifica un rol, asignar "Cliente" por defecto
        if (usuario.getRole() == null || usuario.getRole().isEmpty()) {
            usuario.setRole("Cliente");
        }
        
        return usuarioRepository.save(usuario);
    }

    // Obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    // Obtener usuario por ID
    public Optional<Usuario> obtenerUsuarioPorId(String id) {
        return usuarioRepository.findById(id);
    }

    // Obtener usuario por email
    public Optional<Usuario> obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Actualizar usuario
    public Usuario actualizarUsuario(String id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
            .map(usuario -> {
                if (usuarioActualizado.getNombre() != null) {
                    usuario.setNombre(usuarioActualizado.getNombre());
                }
                if (usuarioActualizado.getApellido() != null) {
                    usuario.setApellido(usuarioActualizado.getApellido());
                }
                if (usuarioActualizado.getEmail() != null) {
                    usuario.setEmail(usuarioActualizado.getEmail());
                }
                if (usuarioActualizado.getPassword() != null) {
                    usuario.setPassword(usuarioActualizado.getPassword());
                }
                if (usuarioActualizado.getEdad() != null) {
                    usuario.setEdad(usuarioActualizado.getEdad());
                }
                if (usuarioActualizado.getTelefono() != null) {
                    usuario.setTelefono(usuarioActualizado.getTelefono());
                }
                if (usuarioActualizado.getIndicativo() != null) {
                    usuario.setIndicativo(usuarioActualizado.getIndicativo());
                }
                if (usuarioActualizado.getCalleYAltura() != null) {
                    usuario.setCalleYAltura(usuarioActualizado.getCalleYAltura());
                }
                if (usuarioActualizado.getProvincia() != null) {
                    usuario.setProvincia(usuarioActualizado.getProvincia());
                }
                if (usuarioActualizado.getCiudad() != null) {
                    usuario.setCiudad(usuarioActualizado.getCiudad());
                }
                if (usuarioActualizado.getCodigoPostal() != null) {
                    usuario.setCodigoPostal(usuarioActualizado.getCodigoPostal());
                }
                return usuarioRepository.save(usuario);
            })
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // Eliminar usuario
    public void eliminarUsuario(String id) {
        usuarioRepository.deleteById(id);
    }    // Login
    public Optional<Map<String, Object>> login(String email, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getPassword().equals(password)) {
                // Return user info without password
                Map<String, Object> userInfo = Map.of(
                    "id", usuario.getId(),
                    "nombre", usuario.getNombre(),
                    "apellido", usuario.getApellido(),
                    "email", usuario.getEmail(),
                    "role", usuario.getRole()
                );
                return Optional.of(userInfo);
            }
        }
        return Optional.empty();
    }
}
