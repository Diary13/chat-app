import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as obj from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = obj.environment.url;

  constructor(private http: HttpClient) { }

  getUsersService() {
    return this.http.get(this.url + '/api/users/all/get').toPromise();
  }

  getUsersAlreadyChatService(userId: any) {
    return this.http.get(this.url + '/api/conversations/' + userId).toPromise();
  }

  createConversationService(senderId: number,receiverId: number) {
    return this.http.post(this.url + '/api/conversations/create/' + receiverId + '/' + senderId + '?grouped=false', {}).toPromise();
  }

  createMessageService(conversationId: number,senderId: number,receiverId: number,grouped: string,message: string) {
    return this.http.post(this.url + '/api/messages/' + conversationId + '/' + receiverId + '/' + senderId + '?grouped=false', {text: message}).toPromise();
  }

  getAllMessageService(conversationId: any) {
    return this.http.get(this.url + '/api/messages/all/' + conversationId).toPromise();
  }

  updateLiaisonTable(userId: any,conversationId: any,vu: boolean) {
    return this.http.post(this.url + '/api/conversations/update/' + userId + '/' + conversationId, { vu: vu }).toPromise();
  }

  updateMessagevU(userId: any,conversationId: any) {
    return this.http.post(this.url + '/api/messages/update/all/' + userId + '/' + conversationId, {}).toPromise();
  }
}
