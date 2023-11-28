import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { SocketService } from 'src/app/services/socket.service';
import { UsersService } from 'src/app/services/users.service';
import * as obj from 'src/environments/environment'

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

	@Input() id: number = 0;

	url = obj.environment.url;
	receiver: any = {};
	users: any;
	conversationId: any;
	grouped: any;
	messages: any = [];
	nb_mes: number = 0;
	test: any;
	userId = sessionStorage.getItem('userId');
	image = sessionStorage.getItem('image');

	message_form = new FormGroup({
		message: new FormControl('',[Validators.required])
	})
  
  	constructor(private userService: UsersService, private socket: SocketService,private clientService: ClientService, private route: ActivatedRoute) {
		
	}

	async ngOnInit() {
		this.socket.connect();
		this.getStatusUser();
		this.getResponseNewMessage();
		this.conversationId = this.route.snapshot.children[0].params['conversationId'];
		// this.grouped = this.route.snapshot.queryParams;
		this.searchUser();
		
		await this.getAllMessages();
		this.nb_mes = this.messages.length;
		//Il est important de parser la conversation Id pour joindre la salle
		this.socket.joinRoomEvent({ 
			userId: (Number(this.userId))-1,
			roomId: Number(this.conversationId)
		});
		//------------------------------------------
		this.getMessage();
	}

	async searchUser() {
		this.userService.userSubject.subscribe((users)=> {
			this.users = users;
		});
		await this.userService.emitUserSubject(this.userId);
		for(let i=0;i<this.users.length;i++) {
			if(this.users[i].id == this.id) {
				this.receiver = this.users[i];
				break;
			}
		}
	}

	getStatusUser() {
		this.socket.getStatusUserEvent().subscribe((res)=> {
			this.searchUser();
		}, (err)=> {
			console.log(err);
		});
	}

	async getAllMessages() {
		if(this.conversationId != 0) {
			try {
				this.messages = await this.clientService.getAllMessageService(this.conversationId);
			} catch(err) {
	
			}
		}
	}

	async sendMessage() {
		if(this.message_form.valid) {
			let controls = this.message_form.controls;
			try {
				let new_message = await this.clientService.createMessageService(this.conversationId,Number(this.userId),this.receiver.id,'false',controls.message.value);
				console.log(new_message);
				this.socket.new_messageEvent(new_message);
				this.socket.sendMessageEvent(new_message);
				controls.message.setValue('');
			} catch(err) {

			}	
		}
	}

	getMessage() {
		this.socket.getMessageEvent().subscribe((res:any)=> {
			this.messages.push(res);
			this.nb_mes = this.messages.length;
		}, (err: any)=> {
			console.log(err);
		})
	}

	getResponseNewMessage() {
		this.socket.getResponseNewMessEvent().subscribe((res)=> {
			console.log("NEW MESSAGE:" + res);
		})
	}
}
