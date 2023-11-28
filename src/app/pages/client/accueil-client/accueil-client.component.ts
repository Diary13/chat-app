import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Utils } from 'src/utils/utils';
import * as obj from 'src/environments/environment'
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styleUrls: ['./accueil-client.component.css']
})

export class AccueilClientComponent extends Utils implements OnInit {

  discussion:any;
  idUserToTalk: any = 0;


  constructor(private socket: SocketService, private route: ActivatedRoute) {
    super();
  }

  async ngOnInit() {
    this.discussion = obj.environment.discussion;
    // this.responsive();
    this.idUserToTalk = this.route.snapshot.params['userIndice'];
  }
}