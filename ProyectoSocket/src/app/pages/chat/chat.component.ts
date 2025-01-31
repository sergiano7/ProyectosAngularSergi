import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  mensajes: any[] = []; // Array para mensajes recibidos
  mensaje: string = ''; // Mensaje a enviar
  username: string = ''; // Nick personalizado por el usuario
  color: string = this.getRandomColor(); // Color único para el usuario
  conectado: boolean = false;
  title: String = 'ProyectoSocket';
  imagenSeleccionada: File | null = null; // Archivo seleccionado para enviar

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((mensaje) => {
      console.log('Nuevo mensaje recibido:', mensaje); // Depuración
      this.mensajes.push(mensaje); // Actualiza el array de mensajes
      console.log('Mensajes actuales:', this.mensajes); // Verifica los mensajes actualizados
    });
  }

  ngOnDestroy(): void {
    this.chatService.desconectar(); // Desconectar al destruir el componente
  }

  // Enviar mensaje
  enviarMensaje() {
    const nuevoMensaje = {
      autor: this.username || 'Usuario Anónimo',
      username: this.username || 'Usuario Anónimo',
      color: this.color,
      contenido: this.mensaje,
    };
    this.chatService.sendMessage(nuevoMensaje);
    this.mensaje = ''; // Limpiar el campo de entrada
  }

  // Manejar la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0]; // Guardar el archivo seleccionado
      console.log('Archivo seleccionado:', this.imagenSeleccionada);
    }
  }

  // Enviar imagen
  enviarImagen(): void {
    if (this.imagenSeleccionada) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;

        const nuevoMensaje = {
          autor: this.username || 'Usuario Anónimo',
          username: this.username || 'Usuario Anónimo',
          color: this.color,
          contenido: '',
          imagen: imageBase64, // Imagen en formato base64
        };

        this.chatService.sendMessage(nuevoMensaje); // Enviar mensaje con imagen
        this.imagenSeleccionada = null; // Limpiar selección de imagen
        console.log('Imagen enviada:', nuevoMensaje);
      };

      reader.readAsDataURL(this.imagenSeleccionada); // Convertir imagen a base64
    }
  }

  // Obtener un color aleatorio para el usuario
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  conectar() {
    this.chatService.conectar(); // Establecer conexión WebSocket
    this.chatService.getMensajesGuardados().subscribe(
      (mensajes) => {
        this.mensajes = mensajes; // Cargar los mensajes previos desde la base de datos
        console.log('Mensajes cargados desde la base de datos:', this.mensajes);
        this.conectado = true; // Cambiar el estado a conectado
      },
      (error) => {
        console.error('Error al cargar mensajes guardados:', error);
      }
    );
  }

  desconectar() {
    this.chatService.desconectar();
    this.conectado = false; // Cambiar el estado a desconectado
  }
}