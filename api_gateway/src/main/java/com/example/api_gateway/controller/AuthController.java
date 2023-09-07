package com.example.api_gateway.controller;

import com.example.api_gateway.entity.AuthEntity;
import com.example.api_gateway.entity.AuthRequest;
import com.example.api_gateway.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest) {
        AuthEntity authEntity = new AuthEntity("register", authRequest.getUsername(), authRequest.getPassword());
        authService.sendAuthEntity(authEntity);
        return ResponseEntity.ok("User successfully registered");
    }

}
