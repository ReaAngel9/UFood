import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  username: string = localStorage.getItem('username') || '';
  isVisible: boolean = false;

  constructor(
    socialAuthService: SocialAuthService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {
    

    socialAuthService.authState.subscribe((user) => {
      if (user) {
        // console.log('Usuario loggeado: ');
      } else {
        // console.log('Se cerro la sesion');
      }
    });
  }

  ngOnInit(): void {
    if((localStorage.getItem('username') && localStorage.getItem('token')) != null){      
      this.isVisible = true;
    }    
  }

  userToFind: any = ''

  findUser( userToFind: String ) {
    let url = '/home/user/' + userToFind;
    this.router.navigate([url]) 
    .then(
      () => {
        window.location.reload();
      }
    )
  }

  openDialog(){
    if(localStorage.getItem('username') != null && localStorage.getItem('token') != null){
      this.dialog.open(DialogComponent, {
        width: '30%',
      });
    }
  }

  navigateToUser() {
    let url = '/home/user/' + localStorage.getItem('username');
    this.router.navigate([url]);
  }

  logOut() {
    this.loginService.signOut();
    this.isVisible = false;
    this.router.navigate(['login']);
  }
}

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: './dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {
//   postForm: FormGroup;
//   constructor(    
//     private fb: FormBuilder,
//     ) {
//       this.postForm = this.fb.group({

//       })
//     }
// }