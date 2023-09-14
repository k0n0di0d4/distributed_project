import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService,
              private messageService: MessageService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.connectToWebSocket()
  }

  sendMsg() {
    console.log(this.writtenMsg)
    this.messageService.send(
      {
        id: 0,
        text: this.writtenMsg,
        sender: this.userService.getUsernameCookie(),
        messageType: "CHAT"
      }
    )
    this.writtenMsg = ''
  }

  deleteMsg() {

  }

  logout(): void {
    this.userService.logout()
  }
}
