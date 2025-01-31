package com.sergi.proyectosockets.SpringServer.controller;


import com.sergi.proyectosockets.SpringServer.models.Mensaje;
import com.sergi.proyectosockets.SpringServer.repositories.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


import java.time.LocalDateTime;

@Controller
public class ChatControllers {

    @Autowired
    private MensajeRepository mensajeRepository; // Inyección del repositorio

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // Para enviar mensajes a los clientes

    @MessageMapping("/mensaje")  // Ruta de solicitud del cliente
    @SendTo("/chat/mensaje")     // Ruta de respuesta para los clientes
    public Mensaje recibeMensaje(Mensaje mensaje) {
        // Configurar atributos adicionales del mensaje
        mensaje.setFechaEnvio(LocalDateTime.now()); // Hora de envío

        // Validar si el usuario envió un nick; si no, asignar uno genérico
        if (mensaje.getUsername() == null || mensaje.getUsername().isEmpty()) {
            mensaje.setUsername("Usuario Anónimo");
        }

        // Guardar el mensaje en la base de datos
        Mensaje mensajeGuardado = mensajeRepository.save(mensaje);

        // Log para depuración
        System.out.println("Mensaje guardado: " + mensajeGuardado);

        // Enviar el mensaje guardado de vuelta a todos los suscriptores
        messagingTemplate.convertAndSend("/chat/mensaje", mensajeGuardado);

        return mensajeGuardado; // Enviar el mensaje de vuelta a todos los suscriptores
    }
}

