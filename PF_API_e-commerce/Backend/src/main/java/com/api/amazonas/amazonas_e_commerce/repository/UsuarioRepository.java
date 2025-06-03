package com.api.amazonas.amazonas_e_commerce.repository;

// Update the import path below to match the actual location of Usuario.java
import com.api.amazonas.amazonas_e_commerce.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
