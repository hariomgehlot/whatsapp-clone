import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { ChatEntity, IRoom, IUser } from 'src/app/types/alltypes';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  roomList?: ChatEntity[];
  sub = new Subscription();
  selectedRoom!: ChatEntity;
  formGroup = new FormGroup({
    searchKey: new FormControl(''),
  });

  constructor(public homeService: HomeService) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  connectWs() {
    this.sub = this.homeService.onMessage().subscribe({
      next: (data) => {
        if (this.roomList) {
          let room = this.roomList.findIndex((item) => {
            return item._id === data.room._id;
          });
          this.roomList[room].lastMessage = data;
          this.roomList[room].messages?.push(data);
          if (this.selectedRoom._id !== data.room._id)
            this.roomList[room].unreadMessageCount++;
        }
        setTimeout(() => {
          if (this.roomList) {
            this.roomList = this.roomList.sort((item, item2) => {
              return (
                new Date(item2.lastMessage.updatedAt).getTime() -
                new Date(item.lastMessage.updatedAt).getTime()
              );
            });
          }
        }, 100);
      },
    });
  }
  ngOnInit(): void {
    this.homeService.reconnectedWs.subscribe(() => this.connectWs());
    this.getAllRooms();
  }

  getAllRooms() {
    this.homeService.getAllRooms().subscribe({
      next: (data) => {
        this.roomList = data as IRoom[];
        if (this.roomList.length) {
          this.roomList.forEach((item) => {
            item.unreadMessageCount = 0;
          });
          this.roomSelected(this.roomList[0]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  roomSelected(roomData: ChatEntity) {
    roomData.unreadMessageCount = 0;
    this.homeService.roomChangedSubject.next(roomData);
    this.selectedRoom = roomData;
  }
  onUserSearch(key: string) {
    if (!key) {
      this.getAllRooms();
    } else {
      this.homeService.getAllUsers(key).subscribe({
        next: (data: any) => {
          this.roomList = data;
        },
      });
    }
  }
}
