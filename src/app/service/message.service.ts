import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reply } from '../models/reply';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  // Send a new message
  sendMessage(userId: number, message: Message): Observable<Message> {
    return this.http.post<Message>(`${NAV_URL}/api/users/messages/${userId}/`, message);
  }

  // Get messages for a specific user
  getMessagesByUserId(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${NAV_URL}/api/users/messages/${userId}`);
  }

  // Get all users with their messages
  getAllUsersWithMessages(): Observable<User[]> {
    return this.http.get<User[]>(`${NAV_URL}/api/users/getalluserswithmsg`);
  }

   // Send a reply to a specific message
   sendReply(messageId: number, reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${NAV_URL}/api/messages/replies/${messageId}/`, reply);
  }


  createReply(messageId: number, reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${NAV_URL}/api/messages/replies/${messageId}/`, reply);
  }
}