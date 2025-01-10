import { Component, Input, SimpleChanges } from "@angular/core";
import { IContact } from "../../../interfaces";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
  standalone: false,
})
export class ContactDetailComponent {
  @Input() contact: IContact; // We assume that the contact will always be transferred
  @Input() isEditing: boolean = false; // Editing mode

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // create a form when editing mode is onn
    if (changes.isEditing) {
      this.contactForm = this.fb.group({
        firstName: [this.contact.firstName],
        lastName: [this.contact.lastName],
        phoneNumber: [this.contact.phoneNumber],
        email: [this.contact.email],
        notes: [this.contact.notes],
      });
    } else {
      // when editing mode is off
      this.contactForm = null; // delete form
    }
  }
}