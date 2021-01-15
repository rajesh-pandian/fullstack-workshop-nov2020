import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {SignupData} from "../../../../shared/models/auth.model";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm:FormGroup;

  $subscription = new Subscription();
  signupErrors$: Observable<string[]>;
  errors: string[] = [];


  // define a map using the official error codes documented in the password-validator node package
  messagePerErrorCode = {
    min: 'The minimum length is 10 characters',
    uppercase: 'At least one upper case character',
    digits: 'At least one numeric character',
    lowercase: 'At lease one lower case character',
    spaces: 'Can not have spaces',
    UserAlreadyExists: 'User already exists'
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

    this.signupErrors$ = this.authService.signupErrors$;

    this.signupForm = this.fb.group({
      username: ['dave@dave.com',Validators.required],
      password: ['123456789aA',Validators.required],
      password2: ['123456789aA',Validators.required]
    }, {
        validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.$subscription.add(

      this.signupErrors$.subscribe(
        errors => this.errors = errors
      )

    )
  }

  signUp() {
     this.signupForm.value;

     if (this.signupForm.valid) {
       const data: SignupData = { ...this.signupForm.value };
       this.authService.signUp(data);
     } else {
       this.signupForm.markAllAsTouched();
     }

  }

  /**
   * Validator: Both password inputs must match.
   */
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const pw = form.get('password');
    const pw2 = form.get('password2');
    return pw && pw2 && pw.value && pw2.value && pw.value !== pw2.value ? { passwordMatch: true } : null;
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
