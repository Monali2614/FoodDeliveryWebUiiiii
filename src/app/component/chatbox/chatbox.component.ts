import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Reply } from 'src/app/models/reply';
import { MessageService } from 'src/app/service/message.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  chatboxBody!: HTMLDivElement;
  messageInput!: HTMLInputElement;
  sendButton!: HTMLButtonElement;
  userId: number = 0;
  messages: Message[] = [];
  newMessageContent: string = '';
  messageContent: string = '';
  userName: string = '';
  newReplyContent: string = '';
  users: any[] = [];


  constructor(private sharedDataService: SharedDataService , private messageService:MessageService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.chatboxBody = document.getElementById('chatbox-body') as HTMLDivElement;
    this.messageInput = document.getElementById('message-input') as HTMLInputElement;
    this.sendButton = document.getElementById('send-button') as HTMLButtonElement;

    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    this.userId=this.sharedDataService.getUserData().id;
    this.userName=this.sharedDataService.getUserData().name;
    console.log(this.userName,'Chatbox UserName@@@@@@@@@');
    console.log(this.userId,'Chatbox UserID@@@@@@@@@');

    this.loadMessages(this.userId);
    this.getMessagesByUserId(this.userId);
  }

  getMessagesByUserId(userId: number): void {
    this.messageService.getMessagesByUserId(userId).subscribe(
      (messages) => {
        this.messages = messages;
        if (this.messages.length === 0) {
          console.log(`No messages found for user with ID ${userId}.`);        }
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
    
  }

    // Load messages for the user
    loadMessages(userId: number): void {
      this.messageService.getMessagesByUserId(this.userId).subscribe((messages) => {
        this.messages = messages;
        console.log(this.messages,'LoadMessages By ID');
      })

      
      this.messageService.getAllUsersWithMessages().subscribe((users) => {
        this.users = users;
        console.log(this.users,'LoadMessages By ID');
      })
    }

    sendReply(messageId: number): void {
      if (this.newReplyContent.trim()) {
        const newReply: Reply= { replyContent: this.newReplyContent };
        this.messageService.sendReply(messageId, newReply).subscribe((reply) => {
          this.newReplyContent = '';
        });
      }
    }

    sendMessage(): void {
    alert("Message has been successfully sent")
      if (this.messageContent.trim() === '') {
        console.error('Message content cannot be empty');
        return;
      }
  
      const newMessage: Message = {
        content: this.messageContent,
        sentTime: new Date().toISOString(),
        userId: this.userId,
        userName: this.userName,
      };
  
      this.messageService.sendMessage(this.userId, newMessage).subscribe(
        (message) => {
          console.log('Message saved:', message);
          this.messageContent = ''; // Clear the input field
        },
        (error) => {
          console.error('Error saving message:', error);
        }
      );
    }

  addMessage(message: string, isUser: boolean): void {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user' : 'other');

    if (!isUser) {
      const avatar = document.createElement('img');
      avatar.src = '';
       avatar.alt = 'hello';
      avatar.classList.add('avatar');
      messageDiv.appendChild(avatar);
    }

    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('message-content');
    messageContentDiv.textContent = message;

    messageDiv.appendChild(messageContentDiv);

    this.chatboxBody.appendChild(messageDiv);
    this.chatboxBody.scrollTop = this.chatboxBody.scrollHeight;
  }
}