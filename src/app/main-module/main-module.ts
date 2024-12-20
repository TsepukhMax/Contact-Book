import { NgModule } from '@angular/core';

import { ContactBookComponent } from './components/contact-book/contact-book.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { CommonModule } from '@angular/common';
import { ContactSearchComponent } from './components/contact-search/contact-search.component';

@NgModule({
  declarations: [ 
    ContactBookComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactSearchComponent,
  ],
  imports: [
    CommonModule, // use for *ngFor, *ngIf...
  ],
  exports: [
    ContactBookComponent, // export the components that are needed in the AppModule
  ],
})
export class MainModule {}
