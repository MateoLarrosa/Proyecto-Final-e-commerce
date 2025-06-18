package com.api.amazonas.amazonas_e_commerce.repository;

import com.api.amazonas.amazonas_e_commerce.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, String> {
    List<Producto> findByUserId(String userId);
}
