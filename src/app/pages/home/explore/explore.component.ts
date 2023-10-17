import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { PostService } from 'src/app/shared/services/posts/post.service';
import { UserServiceService } from 'src/app/shared/services/user/user-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  @Input() posts: any = [];
  newPost: any = {};
  postOwner: any = [];


  constructor(private postService: PostService, private userService: UserServiceService) { }

  ngOnInit(): void {    
    this.postService.getPosts().subscribe((data: any) => {  
      this.posts = data;  
     
      this.posts.forEach((post: any) => {
        // let _id, title, imageUrl, ingredients, procedure, comments, postOwner, description, ownerName;
        if(post.postOwner == undefined){          
          post.ownerName = 'Anonymous';
        }else{
          this.userService.getUserById(post.postOwner).subscribe((data: any) => {
            post.ownerName = data.username;
          })
        }
      });
      // console.log(this.posts);
    });
  }

  sendId(id: string){
    localStorage.setItem('id', id);
  }

}

