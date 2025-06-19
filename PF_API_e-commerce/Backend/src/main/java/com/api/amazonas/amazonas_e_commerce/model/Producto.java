package com.api.amazonas.amazonas_e_commerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Entity(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(nullable = false, length = 1000)
    private String nombre;

    @NotNull(message = "El precio no puede ser null")
    @PositiveOrZero(message = "El precio no puede ser negativo")
    private int precio;

    @NotNull(message = "El stock no puede ser null")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private int stock;

    @NotBlank(message = "La categoría no puede estar vacía")
    private String categoria;

    @Column(length = 20000)
    private String imagen;

    @JoinColumn(name = "userId")
    private String userId;
}
