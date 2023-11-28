import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { SocketService } from 'src/app/services/socket.service';
import { UsersService } from 'src/app/services/users.service';
import * as obj from 'src/environments/environment'
import { Utils } from 'src/utils/utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends Utils implements OnInit {

	users: any = [];
	url = obj.environment.url;
	userId = sessionStorage.getItem('userId');
	user_search: any = '';
	tmp: any = [];
	
  	constructor(private clientService: ClientService, private socket: SocketService, private userService: UsersService, private router: Router,private route_param: ActivatedRoute) {
		super();
	}

	async ngOnInit() {
		this.responsive();
		this.socket.connect();
		this.getStatusUser();
		this.getUserSearching();
		this.userService.userSubject.subscribe((users)=> {
			this.users = users;
			this.tmp = users;
		});
		await this.userService.emitUserSubject(this.userId);
		// this.zoneSearchEmpty();
	}
	async chatWithOther(receiverId: any, conversationId: any) {
		let conversationId_before = this.route_param.snapshot.children[0].params['conversationId'];
		this.clientService.updateMessagevU(this.userId,conversationId);
		await this.clientService.updateLiaisonTable(this.userId,conversationId_before,false);
		this.socket.joinRoomEvent({ 
			userId: (Number(this.userId))-1,
			roomId: conversationId
		});
		await this.clientService.updateLiaisonTable(this.userId,conversationId,true);
		location.assign('#/client/accueil/' + receiverId + '/conversation/' + conversationId );
		location.reload();
	}
	async createConversation(receiverId: number) {
		let isAdmin = sessionStorage.getItem('isAdmin');
		try {
			const res:any = await this.clientService.createConversationService(Number(this.userId),receiverId);
			this.socket.joinRoomEvent(res.id);
			(isAdmin == '1')?
				location.assign('#/admin/accueil/' + receiverId + '/conversation/' + res.id ) :
				location.assign('#/client/accueil/' + receiverId + '/conversation/' + res.id);
			location.reload();
		} catch(err) {

		}
	}
	getStatusUser() {
		this.socket.getStatusUserEvent().subscribe((res)=> {
			this.userService.userSubject.subscribe((users)=> {
				this.users = users;
			})
			this.userService.emitUserSubject(this.userId);
		}, (err)=> {
			console.log(err);
		});
	}
	searchUser(username: string) {		
		let check = false;
		for(let i=0;i<this.users.length;i++) {
			if(this.users[i].username == username) {
				this.socket.searchUserEvent(this.users[i]);
				check = true;
				break;
			}
		}
		if(!check) 
			this.socket.searchUserEvent('not found');
	}
	getUserSearching() {
		this.socket.getUserSearchingEvent().subscribe((res:any)=> {
			if(res.username) {
				this.users = [res];
			} else 
				this.users = []
		})
	}
	zoneSearchEmpty() {
		if(this.user_search == '') {
			this.socket.sendAllUsersEvent(this.tmp);
			this.socket.getAllUsersEvent().subscribe((tmp: any)=> {
				this.users = tmp;
			}, (err)=> {
				console.log(err);				
			});
		}
	}
}
