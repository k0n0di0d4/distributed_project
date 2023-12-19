package com.example.api_gateway.service;

import com.example.api_gateway.entity.AuthEntity;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ProducerAuthService {

    private RabbitTemplate rabbitTemplate;

    @Autowired
    public ProducerAuthService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value("${rabbitmq.authExchange.name}")
    private String exchange;

    @Value("${rabbitmq.authRoutingKey.name}")
    private String routingkey;

    public void sendAuthEntity(AuthEntity authEntity) {
        rabbitTemplate.convertAndSend(exchange, routingkey, authEntity);
    }

    public String sendAndReceiveAuthEntity(AuthEntity authEntity) {
        String result = (String) rabbitTemplate.convertSendAndReceive(exchange, routingkey, authEntity);
        return result;
    }

}
