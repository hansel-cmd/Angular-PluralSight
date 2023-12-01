import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  isDirty: boolean = true;
  newForm = {
    name: '',
    date: '',
    time: '',
    price: 0,
    address: '',
    city: '',
    country: '',
    onlineUrl: '',
    imageUrl: '',
  };

  constructor(private router: Router, private eventService: EventService) {}

  saveEvent(formValue: any) {
    this.eventService.saveEvent(formValue).subscribe((response) => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  validateField(form: any, field: string) {
    return (
      form.controls[field] &&
      (form.controls[field].valid || form.controls[field].untouched)
    );
  }
}
