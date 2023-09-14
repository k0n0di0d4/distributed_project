import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { Router } from '@angular/router';
import { ApiPaths } from 'src/environments/ApiPaths';
import { Message } from '../models/message';
import { catchError } from 'rxjs';
import { UserService } from './user.service';
import { WebsocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {

  private url: string = environment.baseUrl + ApiPaths.Message;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private globalErrorHandler: GlobalErrorHandlerService,
    private router: Router,
    public userService: UserService,
    private websocketService: WebsocketService) { }

  ngOnInit(): void {
  }

  public send(message: Message) {
    // const headers = { 'accept': 'text/plain', 'Authorization': `Bearer ${this.userService.getAccessToken()}` };
    // return this.httpClient.post<Message>(this.url + '/send', message, { headers: headers })
    //   .pipe(
    //     catchError(this.globalErrorHandler.handleError)
    //   )
    this.websocketService.send({ content: message })
  }

  public edit(message: Message) {
    const headers = { 'accept': 'text/plain', 'Authorization': `Bearer ${this.userService.getAccessToken()}` };
    return this.httpClient.put<Message>(this.url + '/edit', message, { headers: headers })
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
  }

  public delete(messageId: String) {
    const headers = { 'accept': 'text/plain', 'Authorization': `Bearer ${this.userService.getAccessToken()}` };
    return this.httpClient.delete<Message>(this.url + '/delete/' + messageId, { headers: headers })
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
  }

  public get(messageId: String) {
    const headers = { 'accept': 'text/plain', 'Authorization': `Bearer ${this.userService.getAccessToken()}` };
    let getMessage;
    return this.httpClient.get<Message>(this.url + '/get/' + messageId, { headers: headers })
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
      .subscribe(message => getMessage = message)
  }

  public getAllFromConversation(conversationId: String) {
    const headers = { 'accept': 'text/plain', 'Authorization': `Bearer ${this.userService.getAccessToken()}` };
    let messagesFromConversation;
    return this.httpClient.get<Message[]>(this.url + '/get/' + conversationId, { headers: headers })
      .pipe(
        catchError(this.globalErrorHandler.handleError)
      )
      .subscribe(messages => messagesFromConversation = messages)
  }
}
