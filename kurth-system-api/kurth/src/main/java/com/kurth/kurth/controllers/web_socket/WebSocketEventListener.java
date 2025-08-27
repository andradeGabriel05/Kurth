package com.kurth.kurth.controllers.web_socket;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.Message;
import org.springframework.boot.sql.init.AbstractScriptDatabaseInitializer;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.Instant;
import java.util.Date;

@Component
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messagingTemplate;
    private final AbstractScriptDatabaseInitializer abstractScriptDatabaseInitializer;

    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate, AbstractScriptDatabaseInitializer abstractScriptDatabaseInitializer) {
        this.messagingTemplate = messagingTemplate;
        this.abstractScriptDatabaseInitializer = abstractScriptDatabaseInitializer;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println("Received a new session connected event: " + event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        final StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        final String username =  accessor.getSessionAttributes().get("username").toString();

        messagingTemplate.convertAndSend("/topic/public", username);
    }
}
