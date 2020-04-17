import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup;

  emailControlIsValid = true;
  passwordControlisValid = true;
  isLogin = true;

  constructor(private router: RouterExtensions) { }

  onSignIn() {
    this.router.navigate(['/today'], { clearHistory: true });
  }

  onSubmit() {
    if (!this.form.valid) return;

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlisValid = true;
    
    if (this.isLogin) {
      console.log('Logging in ...');
    } else {
      console.log('Signing up ...');
    }
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe((status) => {
      this.passwordControlisValid = status === 'VALID';
    });

  }


}
