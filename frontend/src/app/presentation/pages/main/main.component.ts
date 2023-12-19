import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Message} from 'src/app/domain/models/message';
import {MessageService} from 'src/app/domain/services/message.service';
import {UserService} from 'src/app/domain/services/user.service';
import {WebsocketService} from 'src/app/domain/services/web-socket.service';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import {stringify} from "@angular/compiler/src/util";


const WEBSOCKET_URL = 'ws://localhost:19726/ChatApi';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  writtenMsg: string = ''
  // private socket$: WebSocketSubject<any>;

  messages: Message[] = []

  private stompClient: Client;
  public msg: string[] = [];

  current_id: number = Math.random();

  constructor(private userService: UserService,
              private messageService: MessageService) {
    //this.initializeWebSocketConnection();

    this.stompClient = new Client(
      {brokerURL:WEBSOCKET_URL}
    )
    this.stompClient.activate();

    if(this.stompClient.connected){
      console.log("Hey! Connected");
    }



    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe("/topic/public" ,test=>{
        let message_data = JSON.parse(test.body)
        const data: Message = {id: message_data.id,text:message_data.text,sender:message_data.sender,messageType: message_data.messageType}
        this.messages.push(data)
      })

      this.stompClient.subscribe("/topic/delete" ,test=>{
        let message_data = JSON.parse(test.body)
        const data: Message = {id: message_data.id,text:message_data.text,sender:message_data.sender,messageType: message_data.messageType}
        //this.messages = this.messages.filter((test)=>test.id!= data.id);
        let found = this.messages.find((message) => message.id === data.id);

        if(found){
          found.text = "Message deleted..."
          found.messageType = ""
        }
        console.log(found)

      })
    };
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

    console.log(message)

    this.current_id++
    this.writtenMsg = ''
  }

  deleteMsg(msgId: number) {
    let data: Message = {id: msgId, text:"", sender:"", messageType:"DELETE"}

    this.stompClient.publish({destination: '/api/deleteMessage', body: JSON.stringify(data)});
  }

  logout(): void {
    this.userService.logout()
  }

  sendMessage(message: Message) {
    this.stompClient.publish({destination: '/api/sendMessage', body: JSON.stringify(message)});
  }
}
