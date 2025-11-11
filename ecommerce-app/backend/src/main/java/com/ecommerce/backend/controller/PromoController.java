package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.PromoCode;
import com.ecommerce.backend.service.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promo")
@CrossOrigin(origins = "*")
public class PromoController {

    @Autowired
    private PromoService promoService;

    @GetMapping("/validate/{code}")
    public PromoCode validatePromo(@PathVariable String code) {
        return promoService.validatePromo(code);
    }
}
