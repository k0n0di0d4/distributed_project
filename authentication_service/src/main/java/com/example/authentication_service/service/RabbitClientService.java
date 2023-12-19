package com.example.authentication_service.service;

import com.example.authentication_service.entity.AuthEntity;
import com.example.authentication_service.request.AuthenticationRequest;
import com.example.authentication_service.request.RegisterRequest;
import com.example.authentication_service.response.AuthenticationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitClientService {

    private RabbitTemplate rabbitTemplate;

    private AuthenticationService authenticationService;

    private static final Logger logger = LoggerFactory.getLogger(RabbitClientService.class);

    @Autowired
    RabbitClientService(RabbitTemplate rabbitTemplate, AuthenticationService authenticationService) {
        this.rabbitTemplate = rabbitTemplate;
        this.authenticationService = authenticationService;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public String receivedMessage(AuthEntity authEntity) {
        String option = authEntity.getTypeToSend();
        switch(option) {
            case "register":
                RegisterRequest registerRequest = new RegisterRequest(authEntity.getUsername(), authEntity.getPassword());
                AuthenticationResponse response = authenticationService.register(registerRequest);
                String token = response.getToken();
                logger.info("User registered " + registerRequest);
                return token;
            case "login":
                AuthenticationRequest authenticationRequest = new AuthenticationRequest(authEntity.getUsername(), authEntity.getPassword());
                AuthenticationResponse response2 = authenticationService.authentication(authenticationRequest);
                String token1 = response2.getToken();
                logger.info("User logged in " + authenticationRequest);
                return token1;
        }
    return "1";
    }
}
