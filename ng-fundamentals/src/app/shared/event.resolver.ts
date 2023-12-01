import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { EventService } from './event.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventResolver {
  constructor(private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.params['id']);
    return this.eventService.getEvent(id);
  }
}
