import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  chatboxBody!: HTMLDivElement;
  messageInput!: HTMLInputElement;
  sendButton!: HTMLButtonElement;

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
  }

  sendMessage(): void {
    const message = this.messageInput.value.trim();
    if (message) {
      this.addMessage(message, true); // Add user message
      this.messageInput.value = '';
      // Simulate response after 1 second
      // setTimeout(() => this.addMessage("This is a response", false), 1000);
    }
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


