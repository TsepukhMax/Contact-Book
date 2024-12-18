import { Component } from "@angular/core";
import { IContactBook } from "../../../interfaces";
import { ContactService } from "../../../services/contact.service";
import { Observable} from 'rxjs';

@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.component.html",
  styleUrls: ["./contact-book.component.scss"],
  standalone: false,
})

export class ContactBookComponent {
  contacts$: Observable<IContactBook[]>; // use Observable

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getContacts$(); // bind the Observable
  }
}