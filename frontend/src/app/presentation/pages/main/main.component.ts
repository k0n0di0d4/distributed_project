import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Message } from 'src/app/domain/models/message';
import { MessageService } from 'src/app/domain/services/message.service';
import { UserService } from 'src/app/domain/services/user.service';
import { WebsocketService } from 'src/app/domain/services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  writtenMsg: string = ''

  messages: Message[] = [];

  current_id: number = 1;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.connectToWebSocket().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  sendMsg() {
    console.log(this.writtenMsg)
    let message: Message = {
      id: this.current_id,
      text: this.writtenMsg,
      sender: this.userService.getUsernameCookie(),
      messageType: "CHAT"
    }

    this.messageService.send(
      message
    )

    //this.messages.push(message)
    console.log(message)

    this.current_id++
    this.writtenMsg = ''
  }

  deleteMsg(msgId: number) {
    this.messageService.send(
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
}
