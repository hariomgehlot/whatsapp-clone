import { Component, HostBinding, OnInit } from '@angular/core';
import { routeAnimations } from '../animations/routeAnimations';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations],
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') animations = true;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.checkUserLoggedIn();
  }
}
