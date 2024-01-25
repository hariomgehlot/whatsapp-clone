import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../../types/alltypes';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isLeft!: boolean;
  @Input()
  data?: IMessage;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.isLeft = this.data?.sender._id != this.homeService.user._id;
  }
}
