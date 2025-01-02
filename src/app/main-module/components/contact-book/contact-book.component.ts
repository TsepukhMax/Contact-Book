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

  shortcontacts: IContactShort[] = [];
  selectedContact: IContact;

  constructor(private contactService: ContactService) {
    // get all contacts
    this.contactService.getContacts$().subscribe((data: IContactShort[]) => {
      this.shortcontacts = data;
    });
  }

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    this.contactService.getContactById$(id).subscribe((contact: IContact) => {
      this.selectedContact = contact;
    });
  }

  closeSelectedContact(): void {
    this.selectedContact = undefined; // close contact-detail
  }
}