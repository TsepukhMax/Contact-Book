import { Component, ViewChild } from "@angular/core";
import { ContactService } from "../../../services/contact.service";
import { IContact, IContactShort } from "../../../interfaces";
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";


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
  isEditing = false;
  searchTerm: string = "";

  @ViewChild("app-contact-detail", { static: false }) contactDetailComponent: ContactDetailComponent;

  constructor(private contactService: ContactService) {
    // get short contacts
    this.shortContacts = this.contactService.getContacts();

    // Initialize contacts for display from cached data
    this.shortContactsToDisplay = [...this.shortContacts];
  }

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    this.selectedContact = this.contactService.getContactById(id);
    this.isEditing = false;
  }

  closeSelectedContact(): void {
    this.selectedContact = undefined; // close contact-detail
    this.isEditing = false;
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  saveContact(): void {
    console.log("Save contact method called"); // додайте цей рядок для перевірки
    if (this.contactDetailComponent) {
      const updatedContact = this.contactDetailComponent.getContactFromForm();
      console.log('Updated contact from form:', updatedContact);
      this.contactService.updateContact(updatedContact);
      console.log('Updated contact sent to service:', updatedContact);

      // Update short contacts list from the service
      this.shortContacts = this.contactService.getContacts();
      console.log('Updated short contacts list:', this.shortContacts);

      // Update selected contact after saving
      this.selectedContact = this.contactService.getContactById(updatedContact.id);
      console.log('Selected contact after update:', this.selectedContact);

      // Disable editing mode
      this.isEditing = false;

      // Filter contacts based on the search term
      this.onSearchTermChanged(this.searchTerm);
      console.log('Search term after save:', this.searchTerm);
    }
  }

  // Contact filtering method
  onSearchTermChanged(searchTerm: string): void {
    // Removes spaces from the beginning and end of a line
    const normalizedSearchTerm = searchTerm.toUpperCase().trim();

    // check for "truthy/falsy"
    if (!normalizedSearchTerm) {
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