import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getUser(username: string) {
    return this.httpClient.get(this.url + `/post/${username}/posts`);
  }

  getUserPostProfile(username: string) {
    return this.httpClient.get(this.url + `/post/${username}/post`);
  }

  getUserById(id: string) {
    return this.httpClient.get(this.url + `/user/user/${id}`);
  }

  getUserByUsername(username: string) {
    return this.httpClient.get(this.url + `/user/${username}`);
  }

  followUser(username: string, id: string) {
    return this.httpClient.patch(this.url + `/user/${username}/follows`, {
      user: id,
    });
  }

  unfollowUser(username: String, id: string) {
    return this.httpClient.patch(this.url + `/user/${username}/unfollows`, {
      user: id,
    });
  }

  updateUser(username: string, user: any) {
    return this.httpClient.patch(this.url + `/user/${username}`, user);
  }

  updateProfileImage2(username: string, image: any, form: any) {
    return this.httpClient.patch(
      this.url + `/user/${username}/image`,
      image,
      form
      // let httpParams = new HttpParams();
      // const paramsKeys = Object.keys(data);
      // paramsKeys.map(param => {
      // httpParams = httpParams.append(param, params[param]);
    );
  }
}
