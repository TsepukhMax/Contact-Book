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

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // if changed contact
    if (changes['contact'] && this.contact) {
      this.contactForm = this.fb.group({
        firstName: [this.contact.firstName],
        lastName: [this.contact.lastName],
        phoneNumber: [this.contact.phoneNumber],
        email: [this.contact.email],
        notes: [this.contact.notes],
      });
    }
  }
}