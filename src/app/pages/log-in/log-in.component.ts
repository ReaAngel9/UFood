import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  badAuth: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  logIn() {
    const data = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.loginService.login(data).subscribe(
        (response) => {
          this.loginService.sendToken().subscribe((res: any) => {
            //console.log(response); Obtiene objeto del usuario
            localStorage.setItem('username', response.username);
            localStorage.setItem('token', res);
            this.router.navigate(['home']);
          });
        },
        (error) => {
          if (error.status == 404) {
            this.badAuth = true;
          }
        }
      );
    }
  }

  redirect() {
    this.router.navigate(['signUp']);
  }
}
