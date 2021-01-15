import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../shared/services/auth.service";
import {LoginData} from "../../../shared/models/auth.model";
import {Router} from "@angular/router";



@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  /**
   * Initialize form group.
   */
  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['dave@dave.com', Validators.required],
      password: ['123456789aA', Validators.required]
    });
  }
  /**
   * Send username/password to API for logging in.
   */
  submitLogin(): void {
    if (this.loginForm.valid) {
      const data: LoginData = { ...this.loginForm.value };
      this.authService.login(data);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
