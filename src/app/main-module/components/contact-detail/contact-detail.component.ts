import { Component, Input } from "@angular/core";
import { IContactBook } from "../../../interfaces";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
  standalone: false,
})
export class ContactDetailComponent {
  @Input() contact?: IContactBook; // We assume that the contact will always be transferred
}