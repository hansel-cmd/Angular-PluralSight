import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Event } from '../shared/event';
import { ToastrService } from '../shared/toastr.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  isLoading: boolean = true;  

  constructor(
    private eventService: EventService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((response) => {
      this.events = response;
      this.isLoading = false;
    });
  }
}
