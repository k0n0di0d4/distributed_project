import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/domain/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  chatList = document.getElementById("chatList")!

  constructor(private userService: UserService) {
  }
  ngAfterViewInit(): void {
    this.chatList.scrollTop = this.chatList.scrollHeight
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.userService.logout()
  }
}
