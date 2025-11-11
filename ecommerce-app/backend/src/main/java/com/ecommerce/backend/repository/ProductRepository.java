package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.backend.entity.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // To get products by category
    List<Product> findByCategory(String category);
}
