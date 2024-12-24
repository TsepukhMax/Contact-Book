export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

export interface IContactShort {
  id: number;
  firstName: string;
  lastName: string;
}