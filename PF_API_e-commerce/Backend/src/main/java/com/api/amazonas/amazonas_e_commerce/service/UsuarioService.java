package com.api.amazonas.amazonas_e_commerce.service;

import com.api.amazonas.amazonas_e_commerce.model.Usuario;
import com.api.amazonas.amazonas_e_commerce.repository.UsuarioRepository;
import com.api.amazonas.security.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Crear nuevo usuario
    public Map<String, Object> crearUsuario(Usuario usuario) {
        // Validar que el email no esté registrado
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado.");
        }
        
        // Si no se especifica un rol, asignar "Cliente" por defecto
        if (usuario.getRole() == null || usuario.getRole().isEmpty()) {
            usuario.setRole("Cliente");
        }
        
        // Codificar la contraseña antes de guardar
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        // Guardar el usuario
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        // Generar token JWT
        String token = jwtService.generateToken(savedUsuario);
        
        // Devolver usuario y token
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", savedUsuario.getId(),
            "nombre", savedUsuario.getNombre(),
            "apellido", savedUsuario.getApellido(),
            "email", savedUsuario.getEmail(),
            "role", savedUsuario.getRole()
        ));
        
        return response;
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
                    usuario.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
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
    }

    // Login
    public Map<String, Object> login(String email, String password) {
    System.out.println("Intentando login para email: " + email);
    Usuario usuario = usuarioRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    System.out.println("Usuario encontrado: " + usuario.getEmail() + " Pass hash: " + usuario.getPassword());
    
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(email, password)
    );
    System.out.println("Autenticación exitosa");

    String token = jwtService.generateToken(usuario);
    
    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", Map.of(
        "id", usuario.getId(),
        "nombre", usuario.getNombre(),
        "apellido", usuario.getApellido(),
        "email", usuario.getEmail(),
        "role", usuario.getRole()
    ));
    
    return response;
}
}
