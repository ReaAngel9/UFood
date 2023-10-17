import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as socketIo from 'socket.io-client';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  socketClient: any;
  token: string = '';
  userExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.token = user.idToken;
        this.loginService.googleLogin(user).subscribe((r: any) => {
          Object.assign(user, { username: user.firstName });
          this.loginService.normalSignUp(user).subscribe((g: any) => {
            // console.log(user.name);
            localStorage.setItem('username', user.firstName);
          });
          localStorage.setItem('token', this.token);
          this.router.navigate(['home']);
        });
      } else {
        // console.log('Se cerro la sesion');
      }
    });
    this.socketClient = socketIo.io(environment.apiUrl);
  }

  createUser() {
    const data = this.signupForm.getRawValue();

    if (this.signupForm.valid) {
      if (data.password === data.confirmPass) {
        this.loginService.normalSignUp(data).subscribe(
          (r: any) => {
            // console.log(data.username);
            this.loginService.sendToken().subscribe((t: any) => {
              localStorage.setItem('username', data.username);
              localStorage.setItem('token', t);
              this.router.navigate(['home']);
            });
          },
          (error) => {
            if (error.status == 400) this.userExists = true;
          }
        );
      }
    }
  }

  cancel() {
    this.signupForm.reset();
  }

  // shareAccountToken() {
  //   this.socketClient.emit('share', {
  //     token: this.token,
  //   });
  // }
}
