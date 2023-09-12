package com.example.message_service.service;

import com.example.message_service.MessageServiceApplication;
import com.example.message_service.domain.Message;
import com.example.message_service.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageService {

    private MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public void addMessage(Message message) {
        messageRepository.save(message);
    }

    public void deleteMessage(Message message) {
        messageRepository.delete(message);
    }

    public Optional<Message> getMessageById(Long id) {
        Optional<Message> message;
        message = messageRepository.findById(id);

        return message;
    }

}
