import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css'],
})
export class CreateSessionComponent implements OnInit {
  isDirty: boolean = true;
  newSessionForm!: FormGroup;
  name: FormControl<string | null> | undefined;
  presenter: FormControl<string | null> | undefined;
  duration: FormControl<string | null> | undefined;
  level: FormControl<string | null> | undefined;
  abstract: FormControl<string | null> | undefined;
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddNewSession = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  handleSubmit(value: any) {
    this.isDirty = false;
    this.saveNewSession.emit(value);
  }

  cancel() {
    this.cancelAddNewSession.emit();
  }
}
