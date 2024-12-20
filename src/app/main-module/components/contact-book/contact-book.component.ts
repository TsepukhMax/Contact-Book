import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { IContactBook } from "../../../interfaces";
import { ContactService } from "../../../services/contact.service";

@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.component.html",
  styleUrls: ["./contact-book.component.scss"],
  standalone: false,
})
export class ContactBookComponent implements OnInit {
  contacts$: Observable<IContactBook[]>; // Observable
  selectedContact$: Observable<IContactBook | null> = of(null); // Observable for choice contact
  searchQuery: string = ""; // Зберігає пошуковий запит

  constructor(private contactService: ContactService) {
    // initialization Observable for grop of contact
    this.contacts$ = this.contactService.getContacts$();
  }

  ngOnInit(): void {} // No additional subscriptions are required because an async pipe is used

  loadOrSelectContact(id: number | null): void {
    // if id null, reset the selection
    this.selectedContact$ = id
      ? this.contactService.getContactById$(id)
      : of(null); // emit null when the contact is not selected
  }

  onContactSearch(contacts: IContactBook[]): void {
    this.contacts$ = of(contacts); // update the list of contacts
    this.loadOrSelectContact(null); // Reset the contact selection
  }  

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    if (!query.trim()) {
      this.loadOrSelectContact(null); // drop the contact selection if the request is empty
    }
  }
}