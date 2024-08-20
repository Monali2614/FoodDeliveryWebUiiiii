import { Component } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { MessageService } from 'src/app/service/message.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  users: any[] = [];           // Array to store the list of users who have messaged
  selectedUser: any = null;    // The user currently selected to view messages
  messages: any[] = [];        // Array to store messages of the selected user
  newMessage: string = '';     // The new message input by the admin
  userId: number = 0;
  newReplyContent: string = '';

  constructor(private messageService: MessageService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.loadUsers(); // Load users when the component initializes
    this.userId = this.sharedDataService.getUserData().id;
  }

  loadUsers(): void {
    this.messageService.getAllUsersWithMessages().subscribe((data: any[]) => {
      this.users = data; // Get the users who have sent messages
      console.log(this.users,'Messages By ID ');
    });
  }

  selectUser(user: any): void {
    this.selectedUser = user;  // Set the selected user
    this.loadMessages(user.id); // Load messages for the selected user
  }

  loadMessages(userId: number): void {
    this.messageService.getMessagesByUserId(userId).subscribe((data: any[]) => {
      this.messages = data; // Get messages for the selected user
    });
  }

  sendReply(): void {
    alert('Reply sent successfully!');
    
    if (this.newReplyContent.trim() && this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      console.log(lastMessage,'Last Message');

      const reply: Reply = {
        replyContent: this.newReplyContent.trim()
      };

      this.messageService.createReply(lastMessage.id, reply).subscribe(
        (createdReply) => {
          // Update the UI with the new reply
          lastMessage.reply = createdReply;
          this.newReplyContent = ''; // Clear the input field after sending the reply
        },
        (error) => {
          console.error('Error creating reply:', error);
        }
      );
    }
  }
}

