package com.api.amazonas.security.service;

import com.api.amazonas.amazonas_e_commerce.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));
    
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + usuario.getRole().toUpperCase());

    return new User(
        usuario.getEmail(),
        usuario.getPassword(),
        List.of(authority) // Asignamos la lista con el rol
    );
}
}