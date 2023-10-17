import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = environment.apiUrl;
  createUser(data: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}

  googleLogin(googleData: any) {
    return this.httpClient.post(
      this.url + '/signup/google',
      {},
      {
        headers: new HttpHeaders({
          'google-auth': 'Bearer ' + googleData.idToken,
        }),
      }
    );
  }

  normalSignUp(data: any): Observable<any> {
    return this.httpClient.post(this.url + '/user', data);
  }
  login(data: { username: string; password: string }): Observable<any> {
    return this.httpClient.post(this.url + '/user/userpass', data);
  }

  sendToken() {
    return this.httpClient.get(this.url + '/token/new');
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
  }
}
