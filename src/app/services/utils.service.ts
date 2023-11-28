import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private authService: AuthService) { }

  public async logout() {
    try {
      await this.authService.logoutService();
      sessionStorage.removeItem('token');
      location.assign('/')
    } catch(err) {
      console.log(err);
    }
}
}
