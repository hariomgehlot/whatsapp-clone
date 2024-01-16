import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from './url-constants';
import {
  Observable,
  Observer,
  Subject,
  catchError,
  concatMap,
  map,
  of,
  retry,
  throwError,
} from 'rxjs';
import { IMessage, IRoom } from '../types/alltypes';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private urlConstant = urlConstants;
  public roomChangedSubject = new Subject<IRoom>();
  public socket$!: WebSocketSubject<any>;
  private isConnected: boolean = false;
  public openObserver: Observer<any> = {
    next: (opened) => {
      console.log('opened', opened);
      this.isConnected = true;
    },
    error: (error) => {
      console.log('error', error);
      this.isConnected = false;
    },
    complete() {},
  };
  public closeObserver: Observer<any> = {
    next: (closed) => {
      console.log('closed', closed);
      this.isConnected = false;
    },
    error: (error) => {
      console.log('error', error);
      this.isConnected = false;
    },
    complete() {},
  };
  config: WebSocketSubjectConfig<IMessage> = {
    url: urlConstants.WEB_SOCKET_URL,
    closeObserver: this.closeObserver,
    openObserver: this.openObserver,
  };
  constructor(private httpClient: HttpClient) {
    this.connect();
  }
  connect() {
    this.socket$ = webSocket(this.config);
  }
  disconnect() {
    this.socket$.complete();
  }
  onMessage(): Observable<any> {
    return this.socket$
      .asObservable()
      .pipe(retry({ count: Infinity, delay: 5000 }), map(this.handleError));
  }
  handleError(error: any) {
    if (error?.error) {
      alert(error?.error?.message);
      return throwError(() => {
        return error?.error?.message;
      });
    }
    return error;
  }
  send(message: any, roomData: IRoom) {
    let payload = {
      sender: '65a6412e4f9c607b34838663',
      room: roomData._id,
      message: message,
    };
    this.socket$.next(payload);
  }

  getAllRooms() {
    return this.httpClient.get(this.urlConstant.GET_ALL_ROOMS);
  }

  getAllRoomMessages(roomData: IRoom) {
    const payload = {
      roomId: roomData._id,
    };
    return this.httpClient.post(urlConstants.GET_ALL_MESSAGES, payload);
  }
  get isWsConnected(): boolean {
    return this.isConnected;
  }
}
