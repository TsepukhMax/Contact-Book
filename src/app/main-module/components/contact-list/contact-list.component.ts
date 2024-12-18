import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IContactBook } from "../../../interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
  standalone: false,
})
export class ContactListComponent {
  @Input() contacts$: Observable<IContactBook[]> | null = null; // Observable for contacts
  @Output() contactSelected = new EventEmitter<number>(); // Contact selection event

  selectContact(id: number): void {
    this.contactSelected.emit(id); // We send the ID of the selected contact
  }
}