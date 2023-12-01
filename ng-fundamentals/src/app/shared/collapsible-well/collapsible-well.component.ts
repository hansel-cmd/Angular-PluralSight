import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrls: ['./collapsible-well.component.css'],
})
export class CollapsibleWellComponent {
  visible: boolean = true;

  toggleCollapsible() {
    this.visible = !this.visible;
  }
}
