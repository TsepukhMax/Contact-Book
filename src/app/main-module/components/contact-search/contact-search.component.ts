import { Component, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-contact-search",
  templateUrl: "./contact-search.component.html",
  styleUrls: ["./contact-search.component.scss"],
  standalone: false,
})
export class ContactSearchComponent {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  // Output EventEmitter with a generic string type
  @Output() searchTermChanged = new EventEmitter<string>();

  // Method to handle input event
  onInput(): void {
    const searchTerm = this.searchInput.nativeElement.value;
    this.searchTermChanged.emit(searchTerm); // Emit the current value
  }

  // Method to handle reset button click
  onReset(): void {
    this.searchInput.nativeElement.value = ''; // Reset the input value
    this.searchTermChanged.emit(''); // Emit an empty string
  }
}