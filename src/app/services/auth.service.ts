import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as obj from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = obj.environment.url;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  public login(mail: any, password: any) {
      return this.http.post(this.url + '/api/users/login', { mail:mail, password:password}).toPromise(); 
  }
  async logoutService(userId: any,conversationId: any) {
    await this.http.post(this.url + '/api/conversations/update/logout/all/' + userId, {}).toPromise();
    return this.http.post(this.url + '/api/users/logout/' + userId, {}).toPromise();
  }

  public register_user(newUser: any) {
    return this.http.post(this.url + '/api/users/register/', newUser).toPromise();
  }
}
