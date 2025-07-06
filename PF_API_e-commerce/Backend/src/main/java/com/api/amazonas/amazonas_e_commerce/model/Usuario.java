package com.api.amazonas.amazonas_e_commerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @NotBlank(message = "El username no puede estar vacío")
    @Column(nullable = false, unique = true)
    private String username;
    
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe ser válido")
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Column(nullable = false)
    private String password;
    
    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(nullable = false)
    private String nombre;
    
    @NotBlank(message = "El apellido no puede estar vacío")
    @Column(nullable = false)
    private String apellido;
    
    @Column(nullable = false)
    private String role = "Cliente";
    
    private String edad;
    private String telefono;
    private String indicativo;
    private String calleYAltura;
    private String provincia;
    private String ciudad;
    private String codigoPostal;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // Usamos el email como username
    }

    // Getters para los campos que podrian quedar vacios...
    public String getEdad(){
        return (edad != null) ? edad : "";
    }
    public String getTelefono(){
        return (telefono != null) ? telefono : "";
    }
    public String getIndicativo(){
        return (indicativo != null) ? indicativo : "";
    }
    public String getCalleYAltura(){
        return (calleYAltura != null) ? calleYAltura : "";
    }
    public String getProvincia(){
        return (provincia != null) ? provincia : "";
    }
    public String getCiudad(){
        return (ciudad != null) ? ciudad : "";
    }
    public String getCodigoPostal(){
        return (codigoPostal != null) ? codigoPostal : "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
