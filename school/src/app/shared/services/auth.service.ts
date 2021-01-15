import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthData, LoginData, SignupData} from "../models/auth.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  api = '/api/fullstack/user';

  private intervalId = undefined;
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private tokenTimer: ReturnType<typeof setTimeout>;

  private timeRemSubject = new BehaviorSubject<string>(undefined);
  countDownTimer$ = this.timeRemSubject.asObservable();

  private signupErrSubject = new BehaviorSubject<string[]>([]);
  signupErrors$ = this.signupErrSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Attempt to log the user in.
   */
  login(data: LoginData): void  {
    this.http.post<AuthData>(`${this.api}/login`, data)
      .subscribe(res=>{this.loginSetup(res)});
  }

  /**
   * Signup a new user.
   */
  signUp(data: SignupData): void  {
    this.http.post<AuthData>(`${this.api}/signup`, data)
      .subscribe(
        res=> {this.loginSetup(res)},
        err => {
          if (err.error.message.length > 0) {
            this.signupErrSubject.next(err.error.message);
          } else {
            this.signupErrSubject.next([]);
          }
        });
  }

  /**
   * Set a timer to automatically logout when token expires.
   * @param duration - Timer duration in seconds
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);

    this.intervalId = setInterval(() => {
      const expirationDate = localStorage.getItem('expiration');
      const now = new Date();
      const timeRemaining = (new Date(expirationDate)).getTime() - now.getTime();
      const timeLeft = new Date(timeRemaining).toISOString().substr(11, 8);
      this.timeRemSubject.next(timeLeft);
    }, 1000);
  }


  private loginSetup(data: AuthData): void {
    // store local copy of token
    this.token = data.token;
    // set AuthData in localStorage
    localStorage.setItem('token', data.token);
    // set a Date object to 'now' + data.expiresIn seconds
    const expirationDate = new Date((new Date()).getTime() + data.expiresIn * 1000);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', data.id.toString());
    this.setAuthStatus(true);
    this.router.navigate(['/']);
    // set a logout timer using data.expiresIn
    this.setAuthTimer(data.expiresIn);
  }

  /**
   * Return the JWT stored in localStorage.
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Checks if the user has a valid token in localStorage, and sets auth status accordingly.
   */
  autoAuthUser() {
    const storedToken = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!storedToken || !expirationDate) {
      // missing data, treat user as NOT authenticated
      this.setAuthStatus(false);
      return;
    }

    // set local copy of JWT
    this.token = storedToken;

    // calculate whether expiration date is in the future or not
    const now = new Date();
    const expiresIn = (new Date(expirationDate)).getTime() - now.getTime();
    if (expiresIn > 0) {
      // expiration date is in the future, treat user as authenticated
      this.setAuthStatus(true);
      // set a logout timer
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  /**
   * set property isAuthenticated and
   * emit the new authorization status
   * @param authorized
   */

  setAuthStatus(authorized: boolean) {
    this.isAuthenticated = authorized;
    this.authStatusListener.next(authorized);
  }


  logout(): void {

    localStorage.clear();
    this.token = null;

    // set isAuthenticated to false and notify subscribers
    this.setAuthStatus(false);

    // clear auth timer
    clearTimeout(this.tokenTimer);
    clearInterval(this.intervalId);
  }

  /**
   * Returns an observable that emits changes to the user's authentication status.
   */
  authStatusChanges(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  /**
   * Returns true if user is authenticated, false otherwise.
   */
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

}
