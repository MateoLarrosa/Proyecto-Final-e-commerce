package com.api.amazonas.amazonas_e_commerce.controller;

// Update the import below to match the actual package of Usuario
import com.api.amazonas.amazonas_e_commerce.model.Usuario;
// Update the import below to match the actual package of UsuarioService
import com.api.amazonas.amazonas_e_commerce.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        try {
            Map<String, Object> response = usuarioService.crearUsuario(usuario);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios() {
        return ResponseEntity.ok(usuarioService.obtenerTodosLosUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable String id) {
        return usuarioService.obtenerUsuarioPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            Map<String, Object> response = usuarioService.login(
                credentials.get("email"), 
                credentials.get("password")
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                .body(Map.of("message", "Email o contraseña incorrectos"));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable String id,
            @RequestBody Usuario usuarioActualizado) {
        try {
            Usuario usuario = usuarioService.actualizarUsuario(id, usuarioActualizado);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
