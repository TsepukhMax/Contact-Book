import { Component, Input } from "@angular/core";

@Component({
  selector: "app-contact-item",
  templateUrl: "./contact-item.component.html",
  styleUrls: ["./contact-item.component.scss"],
  standalone: false,
})
export class ContactItemComponent {
  @Input() fullName: string = ''; // Значення за замовчуванням
}