import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class RouterActivatorService {
  constructor(private eventService: EventService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const id: number = Number(route.params['id']);
    // const eventExists = !!this.eventService.getEvent(id);
    // if (!eventExists) {
    //   this.router.navigate(['/404']);
    // }
    // return eventExists;
    return true;
  }
}
