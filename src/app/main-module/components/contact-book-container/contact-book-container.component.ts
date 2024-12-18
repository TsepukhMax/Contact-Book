import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IContactBook } from "../../../interfaces";
import { ContactService } from "../../../services/contact.service";

@Component({
  selector: "app-contact-book-container",
  templateUrl: "./contact-book-container.component.html",
  styleUrls: ["./contact-book-container.component.scss"],
  standalone: false,
})
export class ContactBookContainerComponent implements OnInit {
  contacts$: Observable<IContactBook[]>; // Observable
  selectedContact$: Observable<IContactBook> | null = null; // Observable for choice contact

  constructor(private contactService: ContactService) {
    // initialization Observable for grop of contact
    this.contacts$ = this.contactService.getContacts$();
  }

  ngOnInit(): void {
    // No additional subscriptions are required because an async pipe is used
  }

  loadOrSelectContact(id: number): void {
    // initialization Observable for corect contact
    this.selectedContact$ = this.contactService.getContactById$(id);
  }

  onContactSearch(query: string): void {
    // Updating the Observable to search for contacts
    this.contacts$ = this.contactService.searchContact$(query);
  }
}