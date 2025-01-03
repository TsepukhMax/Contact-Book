import { Component } from "@angular/core";
import { ContactService } from "../../../services/contact.service";
import { IContact, IContactShort } from "../../../interfaces";


@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.component.html",
  styleUrls: ["./contact-book.component.scss"],
  standalone: false,
})
export class ContactBookComponent {

  shortContacts: IContactShort[] = [];
  selectedContact: IContact;

  constructor(private contactService: ContactService) {
    // get short contacts
    this.shortContacts = this.contactService.getContacts();
  }

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    this.selectedContact = this.contactService.getContactById(id);
  }

  closeSelectedContact(): void {
    this.selectedContact = undefined; // close contact-detail
  }
}