import { Injectable } from '@angular/core';
import { IContact, IContactShort } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private baseUrl: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) {}

  // Method to get all contacts
  getContacts(): Observable <IContactShort[]> {
    return this.httpClient.get<IContactShort[]>(`${this.baseUrl}contacts`);
  }

  // Method to get contact by ID
  getContactById(id: number): Observable<IContact> {
    return this.httpClient.get<IContact>(`${this.baseUrl}contacts/${id}`);
  }

  // Method to update a contact
  updateContact(contact: IContact): Observable<number> {
    return this.httpClient.put<number>(`${this.baseUrl}contacts/${contact.id}`, {contact});
  }

  // Method to add contact
  addContact(contact: IContact): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}contacts`, { contact });
  }

  // Method to delete a contact by ID
  deleteContact(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}contacts/${id}`);
  }
}