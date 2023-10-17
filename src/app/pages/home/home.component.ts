import { Component, Input, OnInit } from '@angular/core';
import { post } from 'cypress/types/jquery';
import { PostService } from 'src/app/shared/services/posts/post.service';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { UserServiceService } from 'src/app/shared/services/user/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // socket: any;
  userPost: any = [];
  follows: any = [];
  username: any = [];
  isliked: boolean = false;

  constructor(
    private userService: UserServiceService,
    private postService: PostService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    //console.log('username: ', localStorage.getItem('username'));

    this.userService
      .getUserByUsername(localStorage.getItem('username') || '')
      .subscribe((response: any) => {
        this.follows = response.follows;
        // console.table(this.follows);
        this.follows.forEach((element: string) => {
          this.userService.getUserById(element).subscribe((res: any) => {
            // this.username.push(res.username);
            // console.log('Username-> ',this.username);
            this.userService.getUser(res.username).subscribe((posts: any) => {
              this.userPost.push(posts);
            });
          });
        });
        // console.log(this.userPost);
      });
  }

  sendId(id: string) {
    localStorage.setItem('id', id);
  }

  like(id: string) {
    this.postService.getPostId(id).subscribe((post: any) => {
      post.likeCounter++;
      console.log(post.likeCounter);
      this.postService
        .updateOnePost(id, post.likeCounter)
        .subscribe((result) => {
          console.log(result);
          this.isliked = true;
        });
    });
  }
  
  dislike(id:string){
    this.postService.getPostId(id).subscribe((post: any) => {
      post.likeCounter--;
      console.log(post.likeCounter);
      this.postService
        .updateOnePost(id, post.likeCounter)
        .subscribe((result) => {
          console.log(result);
          this.isliked = true;
        });
    });
  }

  like2(id: string) {
    // listen event
    this.socket.listen('like').subscribe((data) => {
      console.log('test');
    });
  }
  // newPost() {
  //   this.socketClient.emit('new-post', {
  //     title: 'test',
  //     imageUrl: 'tes.jpg',
  //     ingredients: 'lalalal',
  //     procedure: 'mumumumu',
  //   });
  // }
}
