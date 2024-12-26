import { Component } from "@angular/core";
import { IContactShort } from "../../../interfaces";

@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.component.html",
  styleUrls: ["./contact-book.component.scss"],
  standalone: false,
})
export class ContactBookComponent {
  shortContacts: IContactShort[] = []; // Array for saving short contacts
  selectedContactId: number; // The ID of the selected contact
}