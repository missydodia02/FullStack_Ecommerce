package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Product> getProductsByCategory(String category) {
        return repo.findByCategory(category);
    }

    // Search products by name (case-insensitive)
    public List<Product> searchByName(String name) {
        if (name == null || name.isEmpty()) return getAllProducts();
        String lower = name.toLowerCase();
        return repo.findAll().stream()
                .filter(p -> p.getTitle() != null && p.getTitle().toLowerCase().contains(lower))
                .collect(Collectors.toList());
    }

    // Filter by price range
    public List<Product> filterByPrice(Double min, Double max) {
        return repo.findAll().stream()
                .filter(p -> {
                    double price = p.getPrice() != null ? p.getPrice() : 0.0;
                    boolean okMin = min == null || price >= min;
                    boolean okMax = max == null || price <= max;
                    return okMin && okMax;
                })
                .collect(Collectors.toList());
    }
}
