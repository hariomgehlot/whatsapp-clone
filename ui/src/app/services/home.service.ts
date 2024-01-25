import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from './url-constants';
import {
  Observable,
  Observer,
  Subject,
  Subscription,
  map,
  retry,
  throwError,
} from 'rxjs';
import { ChatEntity, IMessage, IRoom, IUser } from '../types/alltypes';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private urlConstant = urlConstants;
  private User!: any;
  public snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    direction: 'ltr',
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };
  public roomChangedSubject = new Subject<ChatEntity>();
  public socket$!: WebSocketSubject<any>;
  private isConnected: boolean = false;
  public reconnectedWs: Subject<any> = new Subject();
  private socketSub: Subscription = new Subscription();
  public openObserver: Observer<any> = {
    next: (opened) => {
      console.log('opened', opened);
      this.reconnectedWs.next('');
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
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  checkUserLoggedIn() {
    let localUser = localStorage.getItem('whatsappClone');
    try {
      if (localUser) {
        localUser = JSON.parse(localUser);
        this.User = localUser;
        if (this.isWsConnected) this.disconnect();
        this.config.url =
          urlConstants.WEB_SOCKET_URL + `?userId=${this.User._id}`;
        this.connect();
      } else {
        throw new Error('');
      }
    } catch (error) {
      this.router.navigate(['login']);
      this.snackBar.open('Please login first', 'X', this.snackBarConfig);
    }
  }
  connect() {
    this.socket$ = webSocket(this.config);
    this.socketSub = this.onMessage().subscribe();
  }
  disconnect() {
    this.socketSub.unsubscribe();
    this.socket$.complete();
  }
  onMessage(): Observable<any> {
    return this.socket$
      .asObservable()
      .pipe(retry({ count: Infinity, delay: 5000 }), map(this.handleError));
  }
  handleError(error: any) {
    if (error?.error) {
      this.snackBar.open(error?.error?.message, 'X', this.snackBarConfig);
      return throwError(() => {
        return error?.error?.message;
      });
    }
    return error;
  }
  send(message: any, roomData: any) {
    let payload = {
      sender: this.User._id,
      room: roomData._id,
      message: message,
    };
    this.socket$.next(payload);
  }

  getAllRooms() {
    return this.httpClient.get(this.urlConstant.GET_ALL_ROOMS);
  }
  getAllUsers(search: string) {
    const payload = {
      email: search,
    };
    return this.httpClient.post(this.urlConstant.GET_ALL_USERS, payload);
  }

  getAllRoomMessages(roomData: any) {
    const payload = {
      roomId: roomData._id,
    };
    return this.httpClient.post(urlConstants.GET_ALL_MESSAGES, payload);
  }
  get isWsConnected(): boolean {
    return this.isConnected;
  }

  loginUser(userBody: IUser) {
    const sub = this.httpClient.post(urlConstants.USER_LOGIN, userBody);
    sub.subscribe({
      next: (data: any) => {
        localStorage.setItem(
          'whatsappClone',
          JSON.stringify({
            token: data.token,
            email: data.email,
            _id: data._id,
          })
        );
        this.User = { email: data.email, _id: data._id };
        this.router.navigate(['']);
      },
      error: (error) => {
        this.snackBar.open(
          error?.error?.error?.message,
          'X',
          this.snackBarConfig
        );
      },
    });
    return sub;
  }

  signupUser(userBody: IUser) {
    const sub = this.httpClient.post(urlConstants.USER_CREATE, userBody);
    sub.subscribe({
      next: (data: any) => {
        this.router.navigate(['login']);
        this.snackBar
          .open(
            `User ${userBody.email} created, please login now`,
            'X',
            this.snackBarConfig
          )
          .afterDismissed()
          .subscribe(() => {
            location.reload();
          });
      },
      error: (error) => {
        if (error?.error?.errors) {
          this.snackBar.open(
            error.error.errors[0]?.msg,
            'X',
            this.snackBarConfig
          );
          return;
        }
        this.snackBar.open(
          error?.error?.error?.message,
          'X',
          this.snackBarConfig
        );
      },
    });
    return sub;
  }
  get user(): any {
    return this.User;
  }
}
