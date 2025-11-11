package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.backend.entity.PromoCode;
import java.util.Optional;

public interface PromoCodeRepository extends JpaRepository<PromoCode, Long> {
    Optional<PromoCode> findByCode(String code);
}
