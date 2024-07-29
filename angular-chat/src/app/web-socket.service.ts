import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  
  public connect(url: string): Observable<string> {
    this.socket = new WebSocket(url);

    return new Observable(
      (observer: Observer<string>) => {
        this.socket.onmessage = (event) => observer.next(event.data);
        this.socket.onerror = (event) => observer.error(event);
        this.socket.onclose = (event) => observer.complete();

        return () => this.socket.close();

      }
    )
  }

  public send(message: string): void {
    this.socket.send(message);
    
  }

  constructor() { }
}
