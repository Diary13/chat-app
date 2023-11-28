import { Component } from '@angular/core';
import 'aos';
import { Utils } from 'src/utils/utils';


declare const AOS:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Utils{
  title = 'client';

  constructor() {
    super();
    AOS.init();

    window.addEventListener('resize', ()=> {
      this.responsive();
    });
  }
}
