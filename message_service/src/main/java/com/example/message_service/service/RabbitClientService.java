package com.example.message_service.service;

import com.example.message_service.domain.Message;
import com.example.message_service.domain.type.MessageType;
import com.example.message_service.request.MessageRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitClientService {

    private RabbitTemplate rabbitTemplate;

    private MessageService messageService;

    private static final Logger logger = LoggerFactory.getLogger(RabbitClientService.class);

    @Autowired
    RabbitClientService(MessageService messageService, RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        this.messageService = messageService;

    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(MessageRequest messageRequest) {

        String option = messageRequest.getMessageType();
        logger.info(option);

        switch(option){
            case "CHAT":
                Message message = new Message();
                message.setText(messageRequest.getText());
                message.setSender(messageRequest.getSender());
                message.setReceiver(messageRequest.getReceiver());
                messageService.addMessage(message);
                logger.info("Message registered " + message);
                break;
            case "DELETE":
                Message message1 = new Message();
                message1.setText(messageRequest.getText());
                message1.setSender(messageRequest.getSender());
                message1.setReceiver(messageRequest.getReceiver());
                logger.info("Message deleted " + message1);
                messageService.deleteMessage(message1);
                break;
        }
        //return "nothing done";
        //return "ok";
    }


}
