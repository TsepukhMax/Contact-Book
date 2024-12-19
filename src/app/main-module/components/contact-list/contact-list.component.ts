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
  @Input() contacts$: Observable<IContactBook[]> | null = null;
  @Input() searchQuery: string = ""; // For a search query
  @Output() contactSelected = new EventEmitter<number>();

  selectedContactId: number | null = null; // ID of the selected contact

  selectContact(id: number): void {
    this.selectedContactId = id; // Save the selected ID
    this.contactSelected.emit(id); // emit the contact selection event
  }

  isContactVisible(contact: IContactBook): boolean {
    // check whether the contact corresponds to the search request
    const query = this.searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.id.toString().includes(query)
    );
  }

  isContactHighlighted(contact: IContactBook): boolean {
    // highlight if the contact exactly matches the search query
    const query = this.searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase() === query ||
      contact.lastName.toLowerCase() === query ||
      contact.id.toString() === query
    );
  }
}