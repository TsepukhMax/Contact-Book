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

  private shortContacts: IContactShort[] = [];
  shortContactsToDisplay: IContactShort[] = []; // Public property to display
  selectedContact: IContact;

  constructor(private contactService: ContactService) {
    // get short contacts
    this.shortContacts = this.contactService.getContacts();

    // Initialize contacts for display from cached data
    this.shortContactsToDisplay = [...this.shortContacts];
  }

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    this.selectedContact = this.contactService.getContactById(id);
  }

  closeSelectedContact(): void {
    this.selectedContact = undefined; // close contact-detail
  }

  // Public getter to access shortContacts in the template
  get contacts(): IContactShort[] {
    return this.shortContacts;
  }
  
  // Contact filtering method
  /**
   * @param searchTerm - search term
   */
  onSearchTermChanged(searchTerm: string): void {
    // Removes spaces from the beginning and end of a line
    const normalizedSearchTerm = searchTerm.toUpperCase().trim();

    // check for "truthy/falsy"
    if (normalizedSearchTerm === "") {
      // If the search term is empty, we show all contacts
      this.shortContactsToDisplay = [...this.shortContacts];
      return;
    }

    // If the search term is truthy, we filter contacts
    this.shortContactsToDisplay = this.shortContacts.filter(contact => {
      // form the full name of the contact
      const fullName = `${contact.firstName} ${contact.lastName}`.toUpperCase();

      // check whether the full name includes the search term
      return fullName.includes(normalizedSearchTerm);
    });
  }
}