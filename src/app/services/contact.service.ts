import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IContact, IContactShort } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  // Array for saving short contacts
  shortContacts: IContactShort[] = [
    { id: 1, firstName: "Artem", lastName: "Smith" },
    { id: 2, firstName: "Adam", lastName: "Johnson" },
    { id: 3, firstName: "Adrian", lastName: "Williams" },
    { id: 4, firstName: "Andrew", lastName: "Jones" },
    { id: 5, firstName: "Arnold", lastName: "Brown" },
    { id: 6, firstName: "Ashley", lastName: "Davis" },
    { id: 7, firstName: "Dirk", lastName: "Miller" },
    { id: 8, firstName: "Donald", lastName: "Wilson" },
    { id: 9, firstName: "Douglas", lastName: "Moore" },
    { id: 10, firstName: "Eric", lastName: "Taylor" },
    { id: 11, firstName: "Franklin", lastName: "Anderson" },
    { id: 12, firstName: "George", lastName: "Thomas" },
    { id: 13, firstName: "Gregory", lastName: "Jackson" },
    { id: 14, firstName: "Grant", lastName: "White" },
    { id: 15, firstName: "Harry", lastName: "Harris" },
    { id: 16, firstName: "Harold", lastName: "Martin" },
    { id: 17, firstName: "Herman", lastName: "Thompson" },
    { id: 18, firstName: "Howard", lastName: "Garcia" },
    { id: 19, firstName: "Jack", lastName: "Martinez" },
    { id: 20, firstName: "Jacob", lastName: "Robinson" },
  ];

  // Array with full contact data
  fullContacts: IContact[] = [
    { id: 1, firstName: "Artem", lastName: "Smith", phoneNumber: "380677384250", email: "user1@example.com", notes: "This is a sample note for contact Artem Smith" },
    { id: 2, firstName: "Adam", lastName: "Johnson", phoneNumber: "380677384251", email: "user2@example.com", notes: "This is a sample note for contact Adam Johnson" },
    { id: 3, firstName: "Adrian", lastName: "Williams", phoneNumber: "380677384252", email: "user3@example.com", notes: "This is a sample note for contact Adrian Williams" },
    { id: 4, firstName: "Andrew", lastName: "Jones", phoneNumber: "380677384253", email: "user4@example.com", notes: "This is a sample note for contact Andrew Jones" },
    { id: 5, firstName: "Arnold", lastName: "Brown", phoneNumber: "380677384254", email: "user5@example.com", notes: "This is a sample note for contact Arnold Brown" },
    { id: 6, firstName: "Ashley", lastName: "Davis", phoneNumber: "380677384255", email: "user6@example.com", notes: "This is a sample note for contact Ashley Davis" },
    { id: 7, firstName: "Dirk", lastName: "Miller", phoneNumber: "380677384256", email: "user7@example.com", notes: "This is a sample note for contact Dirk Miller" },
    { id: 8, firstName: "Donald", lastName: "Wilson", phoneNumber: "380677384257", email: "user8@example.com", notes: "This is a sample note for contact Donald Wilson" },
    { id: 9, firstName: "Douglas", lastName: "Moore", phoneNumber: "380677384258", email: "user9@example.com", notes: "This is a sample note for contact Douglas Moore" },
    { id: 10, firstName: "Eric", lastName: "Taylor", phoneNumber: "380677384259", email: "user10@example.com", notes: "This is a sample note for contact Eric Taylor" },
    { id: 11, firstName: "Franklin", lastName: "Anderson", phoneNumber: "380677384260", email: "user11@example.com", notes: "This is a sample note for contact Franklin Anderson" },
    { id: 12, firstName: "George", lastName: "Thomas", phoneNumber: "380677384261", email: "user12@example.com", notes: "This is a sample note for contact George Thomas" },
    { id: 13, firstName: "Gregory", lastName: "Jackson", phoneNumber: "380677384262", email: "user13@example.com", notes: "This is a sample note for contact Gregory Jackson" },
    { id: 14, firstName: "Grant", lastName: "White", phoneNumber: "380677384263", email: "user14@example.com", notes: "This is a sample note for contact Grant White" },
    { id: 15, firstName: "Harry", lastName: "Harris", phoneNumber: "380677384264", email: "user15@example.com", notes: "This is a sample note for contact Harry Harris" },
    { id: 16, firstName: "Harold", lastName: "Martin", phoneNumber: "380677384265", email: "user16@example.com", notes: "This is a sample note for contact Harold Martin" },
    { id: 17, firstName: "Herman", lastName: "Thompson", phoneNumber: "380677384266", email: "user17@example.com", notes: "This is a sample note for contact Herman Thompson" },
    { id: 18, firstName: "Howard", lastName: "Garcia", phoneNumber: "380677384267", email: "user18@example.com", notes: "This is a sample note for contact Howard Garcia" },
    { id: 19, firstName: "Jack", lastName: "Martinez", phoneNumber: "380677384268", email: "user19@example.com", notes: "This is a sample note for contact Jack Martinez" },
    { id: 20, firstName: "Jacob", lastName: "Robinson", phoneNumber: "380677384269", email: "user20@example.com", notes: "This is a sample note for contact Jacob Robinson" },
  ];

  // Method to get all contacts (Observable)
  getContacts$(): Observable<IContactShort[]> {
    return of(this.shortContacts);
  }

  // Method to get contact by ID (Observable)
  getContactById$(id: number): Observable<IContact> {
    const contact = this.fullContacts.find((contact) => contact.id === id)!;
    return of(contact); // Повертаємо повний об'єкт IContact
  }
}