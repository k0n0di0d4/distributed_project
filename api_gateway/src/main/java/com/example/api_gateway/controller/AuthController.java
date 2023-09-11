package com.example.api_gateway.controller;

import com.example.api_gateway.entity.AuthEntity;
import com.example.api_gateway.entity.AuthRequest;
import com.example.api_gateway.entity.JwtTokenOnly;
import com.example.api_gateway.service.ProducerAuthService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    @Value("${spring.rabbitmq.routingkey}")
    private String routingkey;
    private ProducerAuthService authService;
    RabbitTemplate rabbitTemplate;
    @Autowired
    public AuthController(ProducerAuthService authService) {
        this.authService = authService;
    }

    /*@PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest) {
        AuthEntity authEntity = new AuthEntity("register", authRequest.getUsername(), authRequest.getPassword());
        authService.sendAuthEntity(authEntity);
        return ResponseEntity.ok("User successfully registered");
    }*/

    @PostMapping("/user/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest) {
        AuthEntity authEntity = new AuthEntity("register", authRequest.getUsername(), authRequest.getPassword());
        String response = authService.sendAndReceiveAuthEntity(authEntity);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        AuthEntity authEntity = new AuthEntity("login", authRequest.getUsername(), authRequest.getPassword());
        String response = authService.sendAndReceiveAuthEntity(authEntity);
        return ResponseEntity.ok(response);
    }

}
