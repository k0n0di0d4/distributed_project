package com.example.api_gateway.controller;

import com.example.api_gateway.entity.MessageRequest;
import com.example.api_gateway.entity.MessageRequestRequest;
import com.example.api_gateway.service.ProducerMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Value("${rabbitmq.messageExchange.name}")
    private String exchange;

    @Value("${rabbitmq.messageRoutingKey.name}")
    private String routingkey;

    private ProducerMessageService messageService;

    @Autowired
    public MessageController(ProducerMessageService messageService){
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest messageRequest) {
        MessageRequest message = new MessageRequest(messageRequest.getText(), messageRequest.getSender(),
                messageRequest.getReceiver(), messageRequest.getMessageType());
        messageService.sendMessage(message);
        return ResponseEntity.ok("Message sent");
    }

}
