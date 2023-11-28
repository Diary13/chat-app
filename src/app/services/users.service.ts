import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import * as obj from 'src/environments/environment'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any = [];
  userSubject = new Subject<any[]>();
  url = obj.environment.url;

  constructor(private clientService: ClientService) { }

  	checkUserAlreadyChat(user: any, user_chat: any) {
		return new Promise((resolve,reject)=> {
			if(user.id == user_chat.userId) {
				let tmp_user = {
					id: user.id,
					username: user.username,
					mail: user.mail,
					image: user.image,
					status: user.status,
					lastLog: user.lastLog,
					isAdmin: user.isAdmin,
					conversationId: user_chat.conversationId,
					chat: true
				}
				resolve(tmp_user);
			} else
				reject("user.id=" + user.id + " != " + "user_chat.userId=" + user_chat.userId);
		});
	}

  	async createNewUsersArray(tmp_users: any, tmp_users_chat: any, userId: any) {
		// return new Promise((resolve,reject)=> {
		// 	resolve((async()=> {
			this.users = [];
				for(let i=0;i<tmp_users.length;i++) {
					let check = false;
					if(tmp_users[i].id != userId) {
						for(let j=0;j<tmp_users_chat.length;j++) {
							try {
								let user = await this.checkUserAlreadyChat(tmp_users[i],tmp_users_chat[j]);
								this.users.push(user);
								check = true;
								break;
							} catch(err) {
								// console.log(err);
							}
						}
						if(check == false) {
							let user = {
								id: tmp_users[i].id,
								username: tmp_users[i].username,
								mail: tmp_users[i].mail,
								image: tmp_users[i].image,
								status: tmp_users[i].status,
								lastLog: tmp_users[i].lastLog,
								isAdmin: tmp_users[i].isAdmin,
								conversationId: 0,
								chat: false
							}
							this.users.push(user);
						}
					}
				}
		// 	})());
		// })
	}

  	async generateArrayUsers(userId: any) {
		let tmp_users: any = await this.clientService.getUsersService();
		let tmp_users_chat: any = await this.clientService.getUsersAlreadyChatService(userId);
		await this.createNewUsersArray(tmp_users,tmp_users_chat,userId);
	}
	
	async emitUserSubject(userId: any) {
		await this.generateArrayUsers(userId);
		await this.users.sort((a:any,b:any)=> {
			return  b.conversationId - a.conversationId;
		});
        this.userSubject.next(this.users.slice());
    }

}
