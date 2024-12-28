import { Component } from "@angular/core";
import { IContact, IContactShort } from "../../../interfaces";


@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.component.html",
  styleUrls: ["./contact-book.component.scss"],
  standalone: false,
})
export class ContactBookComponent {
  // Array for saving short contacts
  shortContacts: IContactShort[] = [
    { id: 1, firstName: "Artem", lastName: "Smith" },
    { id: 2, firstName: "Adam", lastName: "Johnson" },
    { id: 3, firstName: "Adrian", lastName: "Williams" },
    { id: 4, firstName: "Andrew", lastName: "Jones" },
    { id: 5, firstName: "Arnold", lastName: "Brown" },
    { id: 6, firstName: "Ashley", lastName: "Davis" },
    { id: 7, firstName: "Dirk", lastName: "Miller" },
    { id: 8, firstName: "Donald", lastName: "Wilson" },
    { id: 9, firstName: "Douglas", lastName: "Moore" },
    { id: 10, firstName: "Eric", lastName: "Taylor" },
  ];

  // Array with full contact data
  fullContacts: IContact[] = [
    { id: 1, firstName: "Artem", lastName: "Smith", phoneNumber: "380677384250", email: "user1@example.com", notes: "This is a sample note for contact Artem Smith" },
    { id: 2, firstName: "Adam", lastName: "Johnson", phoneNumber: "380677384251", email: "user2@example.com", notes: "This is a sample note for contact Adam Johnson" },
    { id: 3, firstName: "Adrian", lastName: "Williams", phoneNumber: "380677384252", email: "user3@example.com", notes: "This is a sample note for contact Adrian Williams" },
    { id: 4, firstName: "Andrew", lastName: "Jones", phoneNumber: "380677384253", email: "user4@example.com", notes: "This is a sample note for contact Andrew Jones" },
    { id: 5, firstName: "Arnold", lastName: "Brown", phoneNumber: "380677384254", email: "user5@example.com", notes: "This is a sample note for contact Arnold Brown" },
    { id: 6, firstName: "Ashley", lastName: "Davis", phoneNumber: "380677384255", email: "user6@example.com", notes: "This is a sample note for contact Ashley Davis" },
    { id: 7, firstName: "Dirk", lastName: "Miller", phoneNumber: "380677384256", email: "user7@example.com", notes: "This is a sample note for contact Dirk Miller" },
    { id: 8, firstName: "Donald", lastName: "Wilson", phoneNumber: "380677384257", email: "user8@example.com", notes: "This is a sample note for contact Donald Wilson" },
    { id: 9, firstName: "Douglas", lastName: "Moore", phoneNumber: "380677384258", email: "user9@example.com", notes: "This is a sample note for contact Douglas Moore" },
    { id: 10, firstName: "Eric", lastName: "Taylor", phoneNumber: "380677384259", email: "user10@example.com", notes: "This is a sample note for contact Eric Taylor" },
  ];

  // Object with selected contact details
  selectedContact!: IContact; // By default, no contact is selected

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    const foundContact = this.fullContacts.find(contact => contact.id === id);
    this.selectedContact = foundContact!;
  }
}