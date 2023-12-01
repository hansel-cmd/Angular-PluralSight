import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css'],
})
export class UpvoteComponent {
  @Input() count!: number;
  @Input() voted: boolean = false;
  @Output() handleVote = new EventEmitter();

  vote() {
    this.handleVote.emit();
  }
}
