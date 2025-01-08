import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IContact } from "../../../interfaces";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
  standalone: false,
})
export class ContactDetailComponent {
  @Input() contact: IContact; // We assume that the contact will always be transferred
  @Input() isEditing: boolean = false; // Editing mode
  @Output() editSaved = new EventEmitter<void>();

  // create a copy of the contact
  editableContact: IContact;

  ngOnChanges(): void {
    this.editableContact = { ...this.contact };
  }

  // save chenges
  onSubmit(): void {
    this.contact = { ...this.editableContact };
    this.isEditing = false; // Exit editing mode
    this.editSaved.emit();
  }

  cancelEdit(): void {
    this.editableContact = null; // Cancel temporary changes
  }
}