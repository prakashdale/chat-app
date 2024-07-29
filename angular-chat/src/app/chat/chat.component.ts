import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  newMessage: string = '';
  
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect('ws://localhost:8000/ws/chat').subscribe({
      next: (msg) => this.messages.push(msg),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed')
    
    });
  }

  sendMessage(): void {
    this.webSocketService.send(this.newMessage);
    this.newMessage = '';
    
  }
  

}
