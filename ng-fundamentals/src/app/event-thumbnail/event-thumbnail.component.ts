import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../shared/event';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css'],
  styles: [
    `
      .pad-left {
        margin-left: 2px;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event: Event | undefined;
}
