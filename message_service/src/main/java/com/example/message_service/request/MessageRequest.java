package com.example.message_service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class MessageRequest {
    private String text;
    private String sender;
    private String receiver;
    private String messageType;
}
