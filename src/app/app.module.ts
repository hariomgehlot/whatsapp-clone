import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatContainerComponent } from './sidepanel/chat-container/chat-container.component';
import { ChatCardComponent } from './sidepanel/chat-card/chat-card.component';
import { RightChatHeaderComponent } from './rightpanel/right-chat-header/right-chat-header.component';
import { RightChatContainerComponent } from './rightpanel/right-chat-container/right-chat-container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatContainerComponent,
    ChatCardComponent,
    RightChatHeaderComponent,
    RightChatContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
