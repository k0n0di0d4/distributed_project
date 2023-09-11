package com.example.api_gateway.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//@Configuration
//@EnableWebSocketMessageBroker
public class WebSocketConfig {//implements WebSocketMessageBrokerConfigurer {

    //@Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // carry messages to the clients prefixed with /destination
        // this will be used to subscribe to
        config.enableSimpleBroker("/destination");

        // designate the /app prefix for methods annotated with @MessageMapping
        config.setApplicationDestinationPrefixes("/api");
    }

    //@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // add an endpoint for websocket connections
        registry.addEndpoint("/ChatApi").setAllowedOriginPatterns("*").withSockJS();
    }

}
