import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket } from 'socket.io-client';
import * as obj from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url = obj.environment.url;
  socket: Socket | any;

  constructor() { }

  connect() {
    this.socket = io(this.url);
  }

  joinRoomEvent(data: any) {
    this.socket.emit('join',data);
  }

  sendMessageEvent(data: any) {
    // this.joinRoomEvent(data.conversationId);
    this.socket.emit('sendMessage', data);
  }

  getMessageEvent() {
    return new Observable((observer)=> {
        this.socket.on('sendMessage', (message: any)=> {
          observer.next(message);
        })
    })
  }

  userStatusEvent() {
    this.socket.emit('user_actif', 'status');
  }

  getStatusUserEvent() {
    return new Observable((observer)=> {
      this.socket.on('user_actif',(data:any)=> {
        observer.next(data);
      })
    })
  }
  searchUserEvent(user: any) {
    this.socket.emit('search_user', user);
  }
  getUserSearchingEvent() {
    return new Observable((observer)=> {
      this.socket.on('search_user', (data:any)=> {
        observer.next(data);
      });
    });
  }

  sendAllUsersEvent(users: any) {
    this.socket.emit('allUser', users);
  }
  getAllUsersEvent() {
    return new Observable((observer)=> {
      this.socket.on('allUser', (res:any)=> {
        observer.next(res);
      });
    });
  }

  new_messageEvent(data: any) {
    this.socket.emit('new_message',data);
  }

  getResponseNewMessEvent() {
    return new Observable((observer)=> {
      this.socket.on('new_message',(res:any)=> {
        observer.next(res);
      });
    });
  }
}
