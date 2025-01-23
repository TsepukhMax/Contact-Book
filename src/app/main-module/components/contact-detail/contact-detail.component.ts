import { Component, Input, SimpleChanges } from "@angular/core";
import { IContact } from "../../../interfaces";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    if (changes.isEditing) {
      const currentValue = changes.isEditing.currentValue;
      if (currentValue) {
        this.createForm();
      } else {
        this.deleteForm();
      }
    }
  }
  
  createForm(): void {
    this.contactForm = this.fb.group({
      firstName: [this.contact.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.contact.lastName],
      phoneNumber: [this.contact.phoneNumber],
      email: [this.contact.email],
      notes: [this.contact.notes],
    });
  }
  
  deleteForm(): void {
    this.contactForm = null;
  }

  getContactFromForm(): IContact {
    if (this.contactForm.invalid) {
      return null; // Return null if the form is invalid
    }
    
    return {
      id: this.contact.id,
      firstName: this.contactForm.get('firstName').value,
      lastName: this.contactForm.get('lastName').value,
      phoneNumber: this.contactForm.get('phoneNumber').value,
      email: this.contactForm.get('email').value,
      notes: this.contactForm.get('notes').value,
    };
  }
}