import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatComponent } from './components/rightpanel/chat/chat.component';
import { RightChatContainerComponent } from './components/rightpanel/right-chat-container/right-chat-container.component';
import { RightChatHeaderComponent } from './components/rightpanel/right-chat-header/right-chat-header.component';
import { ChatCardComponent } from './components/sidepanel/chat-card/chat-card.component';
import { ChatContainerComponent } from './components/sidepanel/chat-container/chat-container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatContainerComponent,
    ChatCardComponent,
    RightChatHeaderComponent,
    RightChatContainerComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
