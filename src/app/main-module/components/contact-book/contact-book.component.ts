import { Component, ViewChild } from "@angular/core";
import { ContactService } from "../../../services/contact.service";
import { IContact, IContactShort } from "../../../interfaces";
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { Observable, combineLatest, of } from "rxjs";


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

  @ViewChild(ContactDetailComponent, { static: false }) contactDetailComponent: ContactDetailComponent;

  constructor(private contactService: ContactService) {
    // get short contacts
    this.contactService.getContacts().subscribe((shortContacts: IContactShort[]) => {
      this.shortContacts = this.sortContacts(shortContacts);

    // Initialize contacts for display from cached data
    this.shortContactsToDisplay = [...this.shortContacts];
    });
  }

  // Method to select a contact by its ID
  selectContactById(id: number): void {
    this.contactService.getContactById(id).subscribe((contact: IContact) => {
      this.selectedContact = contact;
      this.isEditing = false;
    });
  }

  closeSelectedContact(): void {
    this.selectedContact = undefined; // close contact-detail
    this.isEditing = false;
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;

    // Check for ID in selected contacts
    if (!this.selectedContact.id) {
      this.selectedContact = null;
    }
  }

  saveContact(): void {
    const updatedContact = this.contactDetailComponent.getContactFromForm();
  
    if (!updatedContact) {
      return;
    }
  
    let request$: Observable<number>;
  
    if (updatedContact.id) {
      request$ = this.contactService.updateContact(updatedContact);
    } else {
      request$ = this.contactService.addContact(updatedContact);
    }
  
    request$.subscribe((newId: number) => {
      this.refreshContactsList(newId);
    });
  }

  // Contact filtering method
  onSearchTermChanged(searchTerm: string): void {
    // Removes spaces from the beginning and end of a line
    this.searchTerm = searchTerm;
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

  private sortContacts(shortContacts: IContactShort[]): IContactShort[] {
    return shortContacts = shortContacts.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    )
  }

  addNewContact(): void {
    this.selectedContact = {
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      email: undefined,
      notes: undefined,
    };
    this.isEditing = true;
  }

  deleteContact(): void {
    this.contactService.deleteContact(this.selectedContact.id).subscribe(() => {
      this.refreshContactsList();
    });
  }

  private refreshContactsList(selectedContactId?: number): void {
    const getContactByIdRequest$ = selectedContactId
    ? this.contactService.getContactById(selectedContactId)
    : of(null);

    combineLatest([
      this.contactService.getContacts(),
      getContactByIdRequest$,
    ])
    .subscribe(([shortContacts, contact]) => {
      this.shortContacts = this.sortContacts(shortContacts);
      this.shortContactsToDisplay = [...this.shortContacts];

      this.selectedContact = contact;


      this.isEditing = false;
      this.onSearchTermChanged(this.searchTerm);
    });
  }
}