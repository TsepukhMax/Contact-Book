import { Component, EventEmitter, Output, OnDestroy } from "@angular/core";
import { ContactService } from "../../../services/contact.service";
import { IContactBook } from "../../../interfaces";
import { Subject, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-contact-search",
  templateUrl: "./contact-search.component.html",
  styleUrls: ["./contact-search.component.scss"],
  standalone: false,
})
export class ContactSearchComponent implements OnDestroy {
  @Output() contactFound = new EventEmitter<IContactBook[]>();
  searchQuery$ = new Subject<string>();
  private subscription: Subscription = new Subscription(); // save the subscription

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchQuery$
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((query) =>
            query?.trim()
              ? this.contactService.searchContact$(query).pipe(
                  catchError((error) => {
                    console.error("Error searching contact:", error);
                    return of([]); // In case of an error, we return an empty array
                  })
                )
              : of([])
          )
        )
        .subscribe((contacts) => this.contactFound.emit(contacts))
    );
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(inputValue); // We send the value to the stream
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clearing subscriptions
  }
}