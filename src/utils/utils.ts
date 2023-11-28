import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';


export class Utils {
    
    // private authService: AuthService | any;

    constructor() {
        
    }
    public getFormFile(id: any) {
      let fd = new FormData();
      let files:any = document.getElementById(id);
      let file = files.files[0];
      return file;
    }

    public responsive() {
      const documentWidth = document.documentElement.clientWidth;
      let menu: any = document.getElementById('btn_menu');
      let tmp:any = document.getElementById('collapseExample');
      
      if(documentWidth < 751) {
        menu.removeAttribute('class','btn_hide');
        menu.setAttribute('class','btn_style');
        tmp.setAttribute('class','collapse');
      } else {
        menu.setAttribute('class','btn_hide');
        tmp.removeAttribute('class','collapse');
      } 
    }
}