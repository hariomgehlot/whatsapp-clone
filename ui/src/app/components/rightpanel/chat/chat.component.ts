import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../../types/alltypes';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isLeft = Math.random() >= 0.5;
  @Input()
  data?: IMessage;
  constructor() {}

  ngOnInit(): void {}
}
