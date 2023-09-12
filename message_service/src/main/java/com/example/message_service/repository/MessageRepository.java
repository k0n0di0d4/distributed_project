package com.example.message_service.repository;

import com.example.message_service.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    //Optional<Message> findByUsername(String username);
}
