package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.PromoCode;
import com.ecommerce.backend.repository.PromoCodeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class PromoService {

    private final PromoCodeRepository repo;

    public PromoService(PromoCodeRepository repo) {
        this.repo = repo;
    }

    // ✅ Validate promo code
    public PromoCode validatePromo(String code) {
        if (code == null || code.trim().isEmpty()) return null;

        return repo.findByCode(code.trim().toUpperCase())
                .filter(PromoCode::isActive)
                .filter(p -> {
                    LocalDateTime now = LocalDateTime.now();
                    boolean validFrom = (p.getValidFrom() == null) || !now.isBefore(p.getValidFrom());
                    boolean validUntil = (p.getValidUntil() == null) || !now.isAfter(p.getValidUntil());
                    return validFrom && validUntil;
                })
                .orElse(null);
    }

    // ✅ Calculate discount
    public double calculateDiscountAmount(Optional<PromoCode> promoOpt, double totalAmount) {
        if (promoOpt == null || promoOpt.isEmpty()) return 0.0;
        PromoCode p = promoOpt.get();
        if (p.isPercentage()) return (totalAmount * p.getValue()) / 100.0;
        return Math.min(p.getValue(), totalAmount);
    }

    // Optional: create new promo
    public PromoCode createPromo(PromoCode promo) {
        promo.setCode(promo.getCode().toUpperCase());
        return repo.save(promo);
    }
}
