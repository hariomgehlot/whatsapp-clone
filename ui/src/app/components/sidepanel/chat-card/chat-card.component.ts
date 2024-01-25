import { Component, Input, OnInit } from '@angular/core';
import { ChatEntity, IRoom } from 'src/app/types/alltypes';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input()
  roomData?: ChatEntity;
  constructor() {}

  ngOnInit(): void {}
}
