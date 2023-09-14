import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Message} from 'src/app/domain/models/message';
import {MessageService} from 'src/app/domain/services/message.service';
import {UserService} from 'src/app/domain/services/user.service';
import {WebsocketService} from 'src/app/domain/services/web-socket.service';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';

const WEBSOCKET_URL = 'ws://localhost:8080/ChatApi';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  writtenMsg: string = ''
  // private socket$: WebSocketSubject<any>;

  messages: Message[] = [];

  public stompClient: Stomp.Client;
  public msg: string[] = [];

  current_id: number = 1;

  constructor(private userService: UserService,
              private messageService: MessageService) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {

  }

  sendMsg() {
    console.log(this.writtenMsg)
    let message: Message = {
      id: this.current_id,
      text: this.writtenMsg,
      sender: this.userService.getUsernameCookie(),
      messageType: "CHAT"
    }

    this.sendMessage(
      message
    )

    //this.messages.push(message)
    console.log(message)

    this.current_id++
    this.writtenMsg = ''
  }

  deleteMsg(msgId: number) {
    this.sendMessage(
      {
        id: msgId,
        text: "",
        sender: "",
        messageType: "DELETE"
      }
    )
  }

  logout(): void {
    this.userService.logout()
  }

  initializeWebSocketConnection() {
    const serverUrl = WEBSOCKET_URL;
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function (frame:any) {
      that.stompClient.subscribe('/api/destination/greetings', (message:any) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message: Message) {
    this.stompClient.send('/api/sendMessage', {}, message);
  }

}
