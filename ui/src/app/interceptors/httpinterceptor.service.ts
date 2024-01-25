import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private homeService: HomeService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      if (req.url.includes('/login')) {
        return next.handle(req);
      }
      let item = localStorage.getItem('whatsappClone');
      if (item) {
        let { token } = JSON.parse(item);
        const authReq = req.clone({
          headers: req.headers.set('Authorization', token),
        });
        return next.handle(authReq);
      } else {
        this.snackBar.open(
          'Please Login First',
          'X',
          this.homeService.snackBarConfig
        );
        this.router.navigate(['login']);
        return next.handle(req);
      }
    } catch (error: any) {
      //not logged in
      return next.handle(req);
    }
  }
}
