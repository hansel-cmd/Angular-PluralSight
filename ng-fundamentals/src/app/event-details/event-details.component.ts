import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../shared/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event!: Event | undefined;
  addMode: boolean = false;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    const event = this.route.snapshot.data['event'];
    if (!event) {
      this.router.navigate(['/404'])
      return;
    }
    this.event = <Event>event;
  }

  addSession() {
    this.addMode = true;
  }

  handleSaveSession(value: any) {
    const sessions = this.event?.sessions.map((session) => session.id);
    let maxId = sessions && sessions.length > 0 ? Math.max(...sessions) : 1;
    const session = {
      id: maxId ?? 1,
      voters: [],
      ...value,
      duration: Number(value.duration)
    }

    this.event?.sessions.push(session);
    this.eventService.updateEvent(this.event).subscribe((response) => {
      this.addMode = false;
    });
  }

  handleCancelAddSession() {
    this.addMode = false;
  }
}
