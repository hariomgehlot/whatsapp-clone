import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { ChatEntity, IMessage, IRoom } from 'src/app/types/alltypes';

@Component({
  selector: 'app-right-chat-container',
  templateUrl: './right-chat-container.component.html',
  styleUrls: ['./right-chat-container.component.scss'],
})
export class RightChatContainerComponent implements OnInit, OnDestroy {
  roomData!: ChatEntity;
  sub = new Subscription();
  messageList: IMessage[] = [];
  formGroup = new FormGroup({
    message: new FormControl(''),
  });
  @ViewChild('chatContainer') chatContainer!: any;
  constructor(private homeService: HomeService) {
    this.homeService.roomChangedSubject.subscribe({
      next: (data) => {
        this.roomData = data;
        this.getMessageOfRoom();
      },
      error: (err) => {},
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getMessageOfRoom();
    this.homeService.reconnectedWs.subscribe(() => this.connectWs());
  }

  connectWs() {
    this.sub = this.homeService.onMessage().subscribe({
      next: (data) => {
        if (data.room._id === this.roomData._id)
          setTimeout(() => {
            this.scroll();
          }, 200);
      },
    });
  }
  scroll(init: boolean = false) {
    if (this.chatContainer) {
      const { offsetHeight, scrollHeight, scrollTop } =
        this.chatContainer.nativeElement;
      if (scrollHeight <= scrollTop + offsetHeight + 200 || init) {
        this.chatContainer.nativeElement?.scrollTo({
          left: 0,
          top: scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }
  getMessageOfRoom() {
    if (this.roomData)
      this.homeService.getAllRoomMessages(this.roomData).subscribe({
        next: (data) => {
          this.roomData.messages = data as IMessage[];
          setTimeout(() => {
            this.scroll(true);
          }, 200);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onMessageSend() {
    let message = this.formGroup.value.message as string;
    if (message) this.homeService.send(message.trim(), this.roomData);
    this.formGroup.reset();
  }
}
