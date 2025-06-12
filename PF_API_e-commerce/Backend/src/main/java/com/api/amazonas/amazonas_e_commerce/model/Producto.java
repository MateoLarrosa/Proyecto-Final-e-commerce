package com.api.amazonas.amazonas_e_commerce.model;
// import java.util.ArrayList;
// import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
// import jakarta.persistence.JoinTable;
// import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 1000)
    private String nombre;
    private int precio;
    private int stock;
    private String categoria;

    @Column(length = 20000)
    private String imagen;
    private String userId;

    // @ManyToMany(fetch = jakarta.persistence.FetchType.LAZY)
    // @JoinTable(name = "productos_categorias",
    //         joinColumns = @jakarta.persistence.JoinColumn(name = "producto_id"),
    //         inverseJoinColumns = @jakarta.persistence.JoinColumn(name = "categoria_id"))
    // private List<Categoria> categorias = new ArrayList<>();
}