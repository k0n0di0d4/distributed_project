package com.example.authentication_service.service;

import com.example.authentication_service.domain.User;
import com.example.authentication_service.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(User user) {
        User save = userRepository.save(user);
        logger.info("persisted " + save);
        logger.info("User received: " + user);
    }
}
