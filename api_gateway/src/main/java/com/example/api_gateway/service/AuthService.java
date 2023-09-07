package com.example.api_gateway.service;

import com.example.api_gateway.entity.AuthEntity;
import com.example.api_gateway.entity.User;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private RabbitTemplate rabbitTemplate;

    @Autowired
    public AuthService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    @Value("${spring.rabbitmq.routingkey}")
    private String routingkey;

    public void sendAuthEntity(AuthEntity authEntity) {
        rabbitTemplate.convertAndSend(exchange, routingkey, authEntity);
    }

}
