import { Injectable } from '@angular/core';
import { IContactBook } from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: IContactBook[] = Array.from({ length: 50 }, (_, i) => {
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
  getContacts$(): Observable<IContactBook[]> {
    return of(this.contacts);
  }

  // Method to get contact by ID (Observable)
  getContactById$(id: number): Observable<IContactBook> {
    const contact = this.contacts.find((contact) => contact.id === id)!;
    return of(contact);
  }

  // Method for searching contact by request (Observable)
  searchContact$(query: string): Observable<IContactBook[]> {
    const foundContacts = this.contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(query.toLowerCase())
    );
    return of(foundContacts);
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