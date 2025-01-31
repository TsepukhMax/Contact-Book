import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactBookComponent } from './components/contact-book/contact-book.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { CommonModule } from '@angular/common';
import { ContactSearchComponent } from './components/contact-search/contact-search.component';

@NgModule({
  declarations: [ 
    ContactBookComponent,
    ContactItemComponent,
    ContactDetailComponent,
    ContactSearchComponent,
  ],
  imports: [
    CommonModule, // use for *ngFor, *ngIf...
    ReactiveFormsModule,
  ],
  exports: [
    ContactBookComponent, // export the components that are needed in the AppModule
  ],
})
export class MainModule {}
