package com.example.api_gateway.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class MessageRequestRequest {
    private String text;
    private String sender;
    private String receiver;
    private String messageType;
}
