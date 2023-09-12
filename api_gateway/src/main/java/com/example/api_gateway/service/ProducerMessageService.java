package com.example.api_gateway.service;

import com.example.api_gateway.entity.MessageRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ProducerMessageService {

    RabbitTemplate rabbitTemplate;

    @Autowired
    public ProducerMessageService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value("${rabbitmq.messageExchange.name}")
    private String exchange;

    @Value("${rabbitmq.messageRoutingKey.name}")
    private String routingkey;

    public void sendMessage(MessageRequest messageRequest) {
        rabbitTemplate.convertAndSend(exchange, routingkey, messageRequest);

    }
}
