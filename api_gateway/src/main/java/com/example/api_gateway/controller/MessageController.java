package com.example.api_gateway.controller;

import com.example.api_gateway.entity.MessageRequest;
import com.example.api_gateway.entity.MessageRequestRequest;
import com.example.api_gateway.service.ProducerMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/message")
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

    //TODO: FIX REQUEST
    @MessageMapping("/send")
    @SendTo("/all")
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest messageRequest) {
        MessageRequest message = new MessageRequest(messageRequest.getId(), messageRequest.getText(), messageRequest.getSender(),
                messageRequest.getReceiver(), "CHAT");
        messageService.sendMessage(message);
        return ResponseEntity.ok("Message sent");
    }

    //TODO: FIX REQUEST
    @MessageMapping("/delete")
    public ResponseEntity<String> deleteMessage(@RequestBody MessageRequest messageRequest) {
        MessageRequest message = new MessageRequest(messageRequest.getId(), messageRequest.getText(), messageRequest.getSender(),
                messageRequest.getReceiver(), "DELETE");
        messageService.sendMessage(message);
        return ResponseEntity.ok("Message deleted");
    }

}
