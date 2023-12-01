import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/login/auth.service';

@Component({
  selector: 'events-app',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
})
export class EventsAppComponent implements OnInit {
  title = 'ng-fundamentals';

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus();
  }

  

}
