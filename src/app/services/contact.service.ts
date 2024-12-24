import { Injectable } from '@angular/core';
import { IContact, IContactShort } from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: IContact[] = Array.from({ length: 50 }, (_, i) => {
    const firstName = this.generateFirstName(i);
    const lastName = this.generateLastName(i);

    return {
      id: i + 1,
      firstName,
      lastName,
      phoneNumber: `3806773842${50 + i}`,
      email: `user${i + 1}@example.com`,
      notes: `This is a sample note for contact ${firstName} ${lastName}`,
    };
  });

  // Method to get all contacts (Observable)
  getContacts$(): Observable<IContact[]> {
    return of(this.contacts);
  }

  // Method to get short contacts
  getShortContacts$(): Observable<IContactShort[]> {
    return of(this.contacts.map(({ id, firstName, lastName }) => ({ id, firstName, lastName })));
  }

  // Method to get contact by ID (Observable)
  getContactById$(id: number): Observable<IContact> {
    const contact = this.contacts.find((contact) => contact.id === id)!;
    return of(contact); // Повертаємо повний об'єкт IContact
  }

  // Method for searching contact by request (Observable)
  searchContact$(query: string): Observable<IContactShort[]> {
    const lowerCaseQuery = query.toLowerCase();
  
    return of(this.contacts.filter((contact) => {
      // Search by ID
      if (!isNaN(Number(query))) {
        return contact.id === Number(query);
      }
      // Search by name or surname
      return (
        contact.firstName.toLowerCase().includes(lowerCaseQuery) ||
        contact.lastName.toLowerCase().includes(lowerCaseQuery)
      );
    })
    .map(({ id, firstName, lastName }) => ({ id, firstName, lastName })), // Conversion into IContactShort
    );
  }

  private generateFirstName(index: number): string {
    const names = [
      'Artem', 'Adam', 'Adrian', 'Andrew', 'Arnold', 'Ashley', 'Dirk', 'Donald', 'Douglas', 'Eric', 'Franklin',
      'George', 'Gregory', 'Grant', 'Harry', 'Harold', 'Herman', 'Howard', 'Jack', 'Jacob', 'Jasper', 'Jeremy', 'Jerry',
      'John', 'Jonathan', 'Joseph', 'Leroy', 'Lewis', 'Liam', 'Lloyd', 'Lucas', 'Marvin', 'Martin', 'Malcolm',
      'Matthew', 'Maximilian', 'Marcus', 'Michael', 'Miles', 'Morris', 'Nate', 'Nicholas', 'Noah', 'Norman',
      'Oliver', 'Oscar', 'Oswald', 'Patrick', 'Phillip', 'Ralph',
    ];
    return names[index % names.length];
  }

  private generateLastName(index: number): string {
    const surnames = [
      'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
      'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
      'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
      'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
      'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins',
    ];
    return surnames[index % surnames.length];
  }
}