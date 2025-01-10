import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-contact-item",
  templateUrl: "./contact-item.component.html",
  styleUrls: ["./contact-item.component.scss"],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class ContactItemComponent {
  @Input() firstName: string = ''; // name of contact
  @Input() lastName: string = '';  // lastName of contact
  @Input() className: string = '';
}