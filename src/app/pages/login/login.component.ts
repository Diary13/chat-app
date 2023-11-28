import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { SocketService } from 'src/app/services/socket.service';
import { UsersService } from 'src/app/services/users.service';
import { Utils } from 'src/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Utils implements OnInit {

	public form = new FormGroup({
		mail: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required])
	});
	users: any = [];

	public form_inscription = new FormGroup({
		username: new FormControl('', [Validators.required]),
		mail: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		image: new FormControl('', [Validators.required])
	});

	constructor(private authService: AuthService, private socket: SocketService, private userService: UsersService, private clientService: ClientService,private router: Router) {
		super();
	}

	ngOnInit(): void {
		this.socket.connect();
	}

	async submit() {
		if(this.form.valid) {
			let controls = this.form.controls;
			try {
				const res:any = await this.authService.login(controls.mail.value, controls.password.value);
				sessionStorage.setItem('userId', res.userId);
				sessionStorage.setItem('username', res.username);
				sessionStorage.setItem('image', res.image);
				sessionStorage.setItem('status', res.status);
				sessionStorage.setItem('token', res.token);
				sessionStorage.setItem('isAdmin', res.isAdmin)
				sessionStorage.setItem('discussion','private');
				this.socket.joinRoomEvent({ 
					userId: res.userId-1,
					roomId: res.userId + 'u'
				});
				this.userService.userSubject.subscribe((users)=> {
					this.users = users;
				});
				await this.userService.emitUserSubject(res.userId);
				if(this.users[0].conversationId != 0) {
					this.clientService.updateLiaisonTable(res.userId,this.users[0].conversationId,true);
					(sessionStorage.getItem('isAdmin') == 'true')? this.router.navigate(['/admin/accueil']) : 
					this.router.navigate(['client/accueil',this.users[0].id ,'conversation',this.users[0].conversationId]);
				} else
					(sessionStorage.getItem('isAdmin') == 'true')? this.router.navigate(['/admin/accueil']) : this.router.navigate(['/client/accueil/0/conversation/0']);
				this.socket.userStatusEvent();
			} catch(err) {
				console.log(err);
				controls.mail.setValue('');
				controls.password.setValue('');
				this.router.navigate(['/']);
			} 
		}
	}

	async saveUser() {
		if(this.form_inscription.valid) {
			const controls = this.form_inscription.controls;
			let fd = new FormData();
			let file = this.getFormFile('image');

			fd.append('username', controls.username.value);
			fd.append('mail', controls.mail.value);
			fd.append('password', controls.password.value);
			fd.append('isAdmin', '0');
			fd.append('image', file);

			try {
				await this.authService.register_user(fd);
				location.reload();
			} catch(err) {
				console.log(err);
			}		
		}
	}
}
