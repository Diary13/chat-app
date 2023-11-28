import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private authService: AuthService, private socket: SocketService) { 
  }

  ngOnInit(): void {
  }
  
  public async logout() {
    try {
      let userId = sessionStorage.getItem('userId');
      await this.authService.logoutService(userId,1);
      this.socket.userStatusEvent();
      sessionStorage.clear();
    } catch(err) {
      console.log(err);
    } finally {
      location.reload();
    }
  }
}