import { Component, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
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
  @Output() contactUpdated = new EventEmitter<IContact>();

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
      firstName: [this.contact.firstName],
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
    return { id: this.contact.id, ...this.contactForm.value };
  }

  // Метод для збереження змін
  saveContact(): void {
    this.contactUpdated.emit(this.contactForm.value);
  }
}