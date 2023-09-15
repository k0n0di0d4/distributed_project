import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Message} from "../models/message";

const WEBSOCKET_URL = 'ws://localhost:19726/ChatApi';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(WEBSOCKET_URL);
  }

  public connectToWebSocket() {
    // this.onMessage().subscribe((message) => {
    //   console.log(message)
    // })
    return this.onMessage()
  }

  // Methods to send WebSocket messages
  send(message: Message) {
    this.socket$.next(message);
  }

  // Subscribe to WebSocket messages
  onMessage() {
    return this.socket$.asObservable();
  }
}
