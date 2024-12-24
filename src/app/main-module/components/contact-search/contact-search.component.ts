import { Component, EventEmitter, Output, OnDestroy } from "@angular/core";
import { ContactService } from "../../../services/contact.service";
import { IContactShort } from "../../../interfaces";
import { Subject, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-contact-search",
  templateUrl: "./contact-search.component.html",
  styleUrls: ["./contact-search.component.scss"],
  standalone: false,
})
export class ContactSearchComponent {
  @Output() searchQueryChanged = new EventEmitter<string>(); // New exit for change request
  @Output() contactFound = new EventEmitter<IContactShort[]>();
  searchQuery$ = new Subject<string>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) =>
          query?.trim()
            ? this.contactService.searchContact$(query)
            : of([])
        )
      )
      .subscribe((contacts) => {
        this.contactFound.emit(contacts);
        this.searchQueryChanged.emit(contacts.length ? contacts[0].firstName : "");
      });
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(inputValue);
  }

  resetSearch(): void {
    window.location.reload(); // updating the page
  }
}