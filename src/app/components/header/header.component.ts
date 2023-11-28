import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import * as obj from 'src/environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url = obj.environment.url;
  image = sessionStorage.getItem('image');
  username = sessionStorage.getItem('username');
  nb_messages: number = 0;

  constructor(private authService: AuthService, private socket: SocketService ,private router: Router,private route_param: ActivatedRoute) { }

  ngOnInit(): void {
    this.socket.connect();
    // this.getResponseNewMessage();
  }

  public async logout() {
    try {
      let conversationId = this.route_param.snapshot.children[0].params['conversationId'];
      let userId = sessionStorage.getItem('userId');
      await this.authService.logoutService(userId,conversationId);
      this.socket.userStatusEvent();
      sessionStorage.clear();
    } catch(err) {
      console.log(err);
    } finally {
      location.reload();
    }
  }

  public GroupedMessage() {
      sessionStorage.setItem('discussion','grouped');
      location.reload();
  }
  public privateMessage() {
    sessionStorage.setItem('discussion','private');
    location.reload();
  }

  getResponseNewMessage() {
		this.socket.getResponseNewMessEvent().subscribe((res)=> {
			console.log("NEW MESSAGE:" + res);
			
		})
	}
  
}
