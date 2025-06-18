package com.api.amazonas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.api.amazonas.amazonas_e_commerce.repository.UsuarioRepository;
import com.api.amazonas.amazonas_e_commerce.model.Usuario;

@Component
public class PasswordMigrationRunner implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        usuarioRepository.findAll().forEach(usuario -> {
            String password = usuario.getPassword();
            if (!password.startsWith("$2")) { // No es BCrypt
                usuario.setPassword(passwordEncoder.encode(password));
                usuarioRepository.save(usuario);
                System.out.println("Actualizada contraseña para usuario: " + usuario.getEmail());
            }
        });
    }
} 