import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/shared/services/posts/post.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  socketClient: any;
  @Input() posts: any = [];
  @Input() ingredients: any = [];
  @Input() procedure: any = [];
  @Input() comments: any = '';

  comment: string = '';
  comm: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPostId(localStorage.getItem('id') || '')
      .subscribe((data: any) => {
        this.posts = data;
        this.ingredients = data.ingredients;
        this.procedure = data.procedure;
        this.comment = data.comments;
      });
  }

  addComment(){
    this.postService.addComment(localStorage.getItem('id') || '', this.comm).subscribe((data: any) => {
      this.comm = '';
      // console.log(this.comm);
    });
  }

  deletedPost(){
    this.socketClient.emit('deleted-post', {
      title: 'test',
      imageUrl: 'tes.jpg',
      ingredients: 'lalalal',
      procedure: 'mumumumu' 
    })
  }

}
