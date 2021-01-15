import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  timeLeft$: Observable<string>;
  $subscription = new Subscription();
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {

    this.$subscription.add(this.authService.authStatusChanges()
      .subscribe(
      authenticated => this.isAuthenticated = authenticated
       )
    );

    this.authService.autoAuthUser();

    this.timeLeft$ = authService.countDownTimer$;
  }

  ngOnInit() {
  }

  logout()  {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
