package com.api.amazonas.amazonas_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;
    
    @Column(nullable = false)
    private String role = "Cliente";
    
    // Campos opcionales para la información adicional del perfil
    @Column(name = "edad")
    private String edad;
    
    @Column(name = "telefono")
    private String telefono;
    
    @Column(name = "indicativo")
    private String indicativo;
    
    // Campos para la dirección
    @Column(name = "calle_y_altura")
    private String calleYAltura;
    
    @Column(name = "provincia")
    private String provincia;
    
    @Column(name = "ciudad")
    private String ciudad;
    
    @Column(name = "codigo_postal")
    private String codigoPostal;
}
