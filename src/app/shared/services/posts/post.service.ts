import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get(this.url + '/post');
  }

  getPostId(id: string) {
    return this.httpClient.get(this.url + `/post/${id}`);
  }

  addComment(id: string, newComment: string) {
    return this.httpClient.patch(this.url + `/post/comments/${id}`, {
      newComment,
    });
  }

  createPost(username: string, post: any) {
    return this.httpClient.post(this.url + `/post/${username}`, post);
  }

  addPostToUser(username: string, id: any) {
    return this.httpClient.patch(this.url + `/user/${username}/posts`, {
      id,
    });
  }
  updateOnePost(id: string, likes: number) {
    return this.httpClient.patch(this.url + `/post/${id}`, {
      likeCounter: likes,
    });
  }

  deletePost(username: string, id: string) {
    return this.httpClient.delete(this.url + `/post/${id}/${username}`);
  }

  updateProfileImage2(image: any, id: string) {
    return this.httpClient.patch(this.url + `/post/${id}/image`, image);
  }
}
