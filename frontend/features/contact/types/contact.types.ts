export interface ContactMessage {
  _id: string;

  name: string;

  email: string;

  subject: string;

  message: string;


  isRead: boolean;


  createdAt?: string;

  updatedAt?: string;
}


export interface ContactFormData {
  name: string;

  email: string;

  subject: string;

  message: string;
}