import { Component, Input, OnInit } from '@angular/core';
import { ChatEntity, IRoom } from 'src/app/types/alltypes';

@Component({
  selector: 'app-right-chat-header',
  templateUrl: './right-chat-header.component.html',
  styleUrls: ['./right-chat-header.component.scss'],
})
export class RightChatHeaderComponent implements OnInit {
  @Input()
  roomData?: ChatEntity;
  constructor() {}

  ngOnInit(): void {}
}
