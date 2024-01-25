import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routeAnimations } from '../animations/routeAnimations';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/services/formErrorState';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [routeAnimations],
})
export class SigninComponent implements OnInit {
  @HostBinding('@routeAnimation') animations = true;
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private homeService: HomeService, private router: Router) {}
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {}
  submit(action: 'login' | 'signup') {
    const body = this.formGroup.value;
    if (action === 'login') {
      this.homeService.loginUser(body);
    } else {
      this.homeService.signupUser(body);
    }
  }
}
