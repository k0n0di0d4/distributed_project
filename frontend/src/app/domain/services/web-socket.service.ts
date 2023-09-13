import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WEBSOCKET_URL = 'ws://localhost:8080/ChatApi';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(WEBSOCKET_URL);
  }

  // Methods to send and receive WebSocket messages
  send(message: any) {
    this.socket$.next(message);
  }

  // Subscribe to WebSocket messages
  onMessage() {
    return this.socket$.asObservable();
  }
}